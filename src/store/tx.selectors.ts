"use client"

import { useTxStore } from './tx.store';
import { useMemo } from 'react';

export const useTxMap = () =>
  useTxStore((state) => state.txs)

export const useTxById = (id: string) =>
  useTxStore((state) => state.txs[id]);

export const useConfirmedTxs = () => {
  const txs = useTxStore((s) => s.txs)

  return useMemo(
    () =>
      Object.values(txs).filter(
        (tx) => tx.status === 'confirmed'
      ),
    [txs]
  )
}

// why selectors ?
// prevents unnecessary re-renders
// better performance scale
