import { create } from 'zustand';
import { Tx, TxStatus } from '@/types/tx';

type TxStore = {
  txs: Record<string, Tx>

  addTx: (tx: Tx) => void

  updateTx: (id: string, updates: Partial<Tx>) => void

  setStatus: (id: string, status: TxStatus) => void

  markReplaced: (id: string, newHash: string) => void

  removeTx: (id: string) => void
}

export const useTxStore = create<TxStore>((set) => ({
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
      const tx = state.txs[id];
      if (!tx) return state;

      return {
        txs: {
          ...state.txs,
          [id]: {
            ...tx,
            ...updates,
            updatedAt: Date.now()
          }
        }
      };
    }),

  setStatus: (id, status) =>
    set((state) => {
      const tx = state.txs[id];
      if (!tx) return state;

      return {
        txs: {
          ...state.txs,
          [id]: {
            ...tx,
            status,
            updatedAt: Date.now()
          }
        }
      };
    }),

  markReplaced: (id, newHash) =>
    set((state) => {
      const tx = state.txs[id];
      if (!tx) return state;

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
      };
    }),

  removeTx: (id) =>
    set((state) => {
      const newTxs = { ...state.txs };
      delete newTxs[id];
      return { txs: newTxs };
    })
}));
