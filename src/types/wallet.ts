import { SupportedChainId } from '@/types/chain';

export type WalletState = {
  address: string | null
  chainId: SupportedChainId | null
  isConnected: boolean
  isConnecting: boolean
}
