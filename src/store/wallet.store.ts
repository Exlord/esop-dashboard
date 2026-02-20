/*
Design Note

We keep wallet state minimal and deterministic
No provider, no signer here — just data.
*/

import { create } from 'zustand';
import { DEFAULT_CHAIN } from '@/config/chains';

type WalletStore = {
  address: string | null,
  chainId: bigint | null,

  isConnected: boolean,
  isConnecting: boolean,

  isCorrectNetwork: boolean,

  setWallet: (data: {
    address: string,
    chainId: bigint,
  }) => void,

  setChain: (chainId: bigint) => void,

  reset: () => void,

  setConnecting: (value: boolean) => void,
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  chainId: null,

  isConnected: false,
  isConnecting: false,

  isCorrectNetwork: false,

  setWallet: ({ address, chainId }) =>
    set({
      address,
      chainId,
      isConnected: true,
      isConnecting: false,
      isCorrectNetwork: chainId === DEFAULT_CHAIN.id
    }),

  setChain: (chainId) =>
    set((state) => ({
      chainId,
      isCorrectNetwork: chainId === DEFAULT_CHAIN.id
    })),

  reset: () =>
    set({
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false
    }),

  setConnecting: (value) =>
    set({
      isConnecting: value
    })
}));


