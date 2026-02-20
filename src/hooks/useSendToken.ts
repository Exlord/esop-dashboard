import { useWallet } from '@/features/wallet/hooks/useWallet';
import { useNetworkGuard } from '@/hooks/useNetworkGuard';
import { createTokenContract } from '@/modules/token';
import { txManager } from '@/services/tx.manager';

export function useSendToken() {
  const { address, chainId } = useWallet()
  const { isCorrectNetwork } = useNetworkGuard()

  return async (to: string, amount: string) => {
    if (!isCorrectNetwork) {
      throw new Error("Wrong network")
    }

    const token = createTokenContract(chainId!)

    return txManager.execute({
      fn: () => token.transfer(to, amount),
      meta: {
        from: address!,
        to: token.address,
        value: "0",
        chainId: chainId!,
      },
    })
  }
}
