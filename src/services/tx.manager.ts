import { providerService } from './provider.service';
import { useTxStore } from '@/store/tx.store';
import { v4 as uuid } from 'uuid';
import { STUCK_BLOCK_THRESHOLD, TX_RECEIPT_STATUS_SUCCESS } from '@/consts/tx';



export class TxManager {
  private isListening = false;

  // 🚀 PUBLIC EXECUTION
  async execute({
    fn,
    meta
  }: {
    fn: () => Promise<any>
    meta: {
      from: string
      to?: string
      value?: string
      chainId: bigint
    }
  }) {
    const id = uuid();
    const now = Date.now();
    const store = useTxStore.getState();
    const provider = providerService.getReadProvider();

    // 1 awaiting signature
    store.addTx({
      id,
      status: 'awaiting_signature',
      createdAt: now,
      updatedAt: now,
      ...meta
    });

    try {
      const tx = await fn();

      // get current block at submission time
      const currentBlock = await provider.getBlockNumber();

      // 2 pending + startBlock
      store.updateTx(id, {
        hash: tx.hash,
        nonce: tx.nonce,
        status: 'pending',
        startBlock: currentBlock
      });

      // 3 start tracking
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

  // BLOCK LISTENER (core engine)
  private ensureBlockListener() {
    if (this.isListening) return;

    const provider = providerService.getReadProvider();

    provider.on('block', async (blockNumber: number) => {
      const store = useTxStore.getState();
      const txs = store.txs;

      for (const tx of Object.values(txs)) {
        if (tx.status !== 'pending') continue;
        if (!tx.hash || tx.chainId !== await provider.getNetwork().then(n => n.chainId)) continue;

        try {
          const receipt = await provider.getTransactionReceipt(tx.hash);

          if (receipt) {
            if (receipt.status === TX_RECEIPT_STATUS_SUCCESS) {
              store.setStatus(tx.id, 'confirmed');
            } else {
              store.setStatus(tx.id, 'failed');
            }
            continue;
          }

          // stuck detection
          if (tx.startBlock && blockNumber - tx.startBlock > STUCK_BLOCK_THRESHOLD) {
            store.setStatus(tx.id, 'stuck');

            // TODO Speed-up suggestion
            // const blocksPending = currentBlock - tx.startBlock
            // if (blocksPending > 10) → suggest higher gas

            // TODO Auto-replacement UI
            // “Speed up”
            // “Cancel transaction”
            // (both = same nonce, different gas)
          }

          // replacement detection
          await this.detectReplacement(tx.id, tx.nonce!, tx.from);

        } catch (err) {
          // swallow to keep loop alive
        }
      }
    });

    this.isListening = true;
  }

  // 🔁 replacement detection via nonce
  private async detectReplacement(
    id: string,
    nonce: number,
    from: string
  ) {
    const provider = providerService.getReadProvider();
    const store = useTxStore.getState();

    const latestNonce = await provider.getTransactionCount(from, 'latest');

    if (latestNonce > nonce) {
      // something got mined with same nonce
      store.setStatus(id, 'replaced');
    }
  }

  // 🧠 error normalization
  private parseError(err: any): string {
    if (err?.code === 4001) {
      return 'User rejected transaction';
    }

    if (err?.message) {
      return err.message;
    }

    return 'Unknown error';
  }
}

export const txManager = new TxManager();
