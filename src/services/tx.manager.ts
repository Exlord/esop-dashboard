import { providerService } from './provider.service';
import { useTxStore } from '@/store/tx.store';
import { v4 as uuid } from 'uuid';
import {
  TX_REQUIRED_CONFIRMATIONS,
  TX_STUCK_BLOCK_THRESHOLD,
  TX_RECEIPT_STATUS_SUCCESS
} from '@/consts/tx';



export class TxManager {
  private isListening = false;

  private unsubscribe?: () => void;

  async execute({
    fn,
    meta
  }: {
    fn: () => Promise<any>
    meta: {
      from: string
      to?: string
      value?: string
      chainId: number
    }
  }) {
    const id = uuid();
    const now = Date.now();
    const store = useTxStore.getState();
    const provider = providerService.getReadProvider();

    store.addTx({
      id,
      status: 'awaiting_signature',
      createdAt: now,
      updatedAt: now,
      ...meta
    });

    try {
      const tx = await fn();

      const currentBlock = await provider.getBlockNumber();

      store.updateTx(id, {
        hash: tx.hash,
        nonce: tx.nonce,
        status: 'pending',
        startBlock: currentBlock
      });

      this.ensureBlockListener();

      return tx;
    } catch (err: any) {
      store.updateTx(id, {
        status: 'failed',
        error: this.parseError(err)
      });
      throw err;
    }
  }

  private ensureBlockListener() {
    if (this.isListening) return;

    const provider = providerService.getReadProvider();

    const handler = async (blockNumber: number) => {
      const store = useTxStore.getState();
      const txs = store.txs;

      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      for (const tx of Object.values(txs)) {
        if (tx.status !== 'pending') continue;
        if (!tx.hash || tx.chainId !== chainId) continue;

        try {
          const receipt = await provider.getTransactionReceipt(tx.hash);

          if (receipt) {
            const confirmations = blockNumber - receipt.blockNumber + 1;

            if (confirmations >= TX_REQUIRED_CONFIRMATIONS) {
              if (receipt.status === TX_RECEIPT_STATUS_SUCCESS) {
                store.setStatus(tx.id, 'confirmed');
              } else {
                store.setStatus(tx.id, 'failed');
              }
            }

            continue;
          }

          // ⛔ stuck detection
          if (
            tx.startBlock &&
            blockNumber - tx.startBlock > TX_STUCK_BLOCK_THRESHOLD
          ) {
            store.setStatus(tx.id, 'stuck');
          }

          // 🔁 replacement detection
          await this.detectReplacement(tx.id, tx.nonce!, tx.from);

        } catch {
          // keep loop alive
        }
      }
    };

    provider.on('block', handler);

    this.unsubscribe = () => {
      provider.off('block', handler);
      this.isListening = false;
    };

    this.isListening = true;
  }

  private async detectReplacement(
    id: string,
    nonce: number,
    from: string
  ) {
    const provider = providerService.getReadProvider();
    const store = useTxStore.getState();

    const latestNonce = await provider.getTransactionCount(from, 'latest');

    if (latestNonce > nonce) {
      store.setStatus(id, 'replaced');
    }
  }

  stop() {
    this.unsubscribe?.();
  }

  private parseError(err: any): string {
    if (err?.code === 4001) {
      return 'User rejected transaction';
    }

    return err?.message || 'Unknown error';
  }
}

export const txManager = new TxManager();
