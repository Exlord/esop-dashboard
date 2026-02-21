import { create } from 'zustand'

type BlockState = {
  blockNumber: number
  setBlock: (n: number) => void
}

export const useBlockStore = create<BlockState>((set) => ({
  blockNumber: 0,
  setBlock: (n) => set({ blockNumber: n })
}))
