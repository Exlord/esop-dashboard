/*
Design Note

We keep wallet state minimal and deterministic
No provider, no signer here — just data.
*/

import { create } from "zustand"

type WalletStore = {
  address: string | null
  chainId: number | null

  isConnected: boolean
  isConnecting: boolean

  setWallet: (data: {
    address: string
    chainId: number
  }) => void

  reset: () => void

  setConnecting: (value: boolean) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  chainId: null,

  isConnected: false,
  isConnecting: false,

  setWallet: ({ address, chainId }) =>
    set({
      address,
      chainId,
      isConnected: true,
      isConnecting: false,
    }),

  reset: () =>
    set({
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
    }),

  setConnecting: (value) =>
    set({
      isConnecting: value,
    }),
}))


