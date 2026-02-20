import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Tx, TxStatus } from '@/types/tx'

type TxStore = {
  txs: Record<string, Tx>

  addTx: (tx: Tx) => void
  updateTx: (id: string, updates: Partial<Tx>) => void
  setStatus: (id: string, status: TxStatus) => void
  markReplaced: (id: string, newHash: string) => void
  removeTx: (id: string) => void
  clear: () => void
}

export const useTxStore = create<TxStore>()(
  persist(
    (set, get) => ({
      txs: {},

      addTx: (tx) =>
        set((state) => ({
          txs: {
            ...state.txs,
            [tx.id]: tx
          }
        })),

      updateTx: (id, updates) =>
        set((state) => {
          const tx = state.txs[id]
          if (!tx) return state

          return {
            txs: {
              ...state.txs,
              [id]: {
                ...tx,
                ...updates,
                updatedAt: Date.now()
              }
            }
          }
        }),

      setStatus: (id, status) =>
        set((state) => {
          const tx = state.txs[id]
          if (!tx) return state

          return {
            txs: {
              ...state.txs,
              [id]: {
                ...tx,
                status,
                updatedAt: Date.now()
              }
            }
          }
        }),

      markReplaced: (id, newHash) =>
        set((state) => {
          const tx = state.txs[id]
          if (!tx) return state

          return {
            txs: {
              ...state.txs,
              [id]: {
                ...tx,
                status: 'replaced',
                replacedBy: newHash,
                updatedAt: Date.now()
              }
            }
          }
        }),

      removeTx: (id) =>
        set((state) => {
          const next = { ...state.txs }
          delete next[id]
          return { txs: next }
        }),

      clear: () => set({ txs: {} })
    }),
    {
      name: 'tx-store',

      storage: createJSONStorage(() => localStorage),

      // 🔥 Only persist txs (not functions)
      partialize: (state) => ({
        txs: state.txs
      }),

      // 🔥 Versioning for future migrations
      version: 1,

      migrate: (persistedState: any, version) => {
        if (!persistedState) return { txs: {} }

        switch (version) {
          case 0:
            return {
              txs: persistedState.txs ?? {}
            }

          case 1:
          default:
            return persistedState
        }
      }
    }
  )
)
