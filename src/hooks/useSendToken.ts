import { useWallet } from '@/features/wallet/hooks/useWallet';
import { useNetworkGuard } from '@/hooks/useNetworkGuard';
import { createTokenContract } from '@/modules/token';
import { txManager } from '@/services/tx.manager';
import { providerService } from '@/services/provider.service';
import { parseUnits } from 'ethers';

export function useSendToken() {
  const { address, chainId } = useWallet();
  const { isCorrectNetwork } = useNetworkGuard();

  return async (to: string, amount: string) => {
    if (!isCorrectNetwork) {
      throw new Error('Wrong network');
    }

    if (!address || !chainId) {
      throw new Error('Wallet not connected');
    }

    const token = createTokenContract(chainId);

    return txManager.execute({
      fn: async () => {
        // 1 convert amount
        const parsedAmount = parseUnits(amount, 18);

        // 2 prepare transaction (simulate + estimate)
        const preparedTx = await token.prepareTransfer(to, parsedAmount);

        // 3 send via signer
        const signer = await providerService.getSigner();

        return signer.sendTransaction(preparedTx);
      },

      meta: {
        from: address,
        to: token.address,
        value: '0',
        chainId
      }
    });
  };
}

