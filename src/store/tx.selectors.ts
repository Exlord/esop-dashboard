"use client"

import { useTxStore } from './tx.store';

export const useAllTxs = () =>
  useTxStore((state) => Object.values(state.txs));

export const usePendingTxs = () =>
  useTxStore((state) =>
    Object.values(state.txs).filter(
      (tx) => tx.status === 'pending'
    )
  );

export const useTxById = (id: string) =>
  useTxStore((state) => state.txs[id]);

// why selectors ?
// prevents unnecessary re-renders
// better performance scale
