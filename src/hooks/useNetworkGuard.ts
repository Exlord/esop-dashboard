import { useWalletStore } from "@/store/wallet.store"

export function useNetworkGuard() {
  const { isCorrectNetwork, chainId } = useWalletStore()

  return {
    isCorrectNetwork,
    chainId,
    isReadOnly: !isCorrectNetwork,
  }
}
