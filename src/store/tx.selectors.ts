"use client"

import { useTxStore } from './tx.store';

export const useTxMap = () =>
  useTxStore((state) => state.txs)

export const useTxById = (id: string) =>
  useTxStore((state) => state.txs[id]);

// why selectors ?
// prevents unnecessary re-renders
// better performance scale
