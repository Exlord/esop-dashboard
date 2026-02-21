"use client"

import { useTxMap } from '@/store/tx.selectors';
import { useMemo } from 'react';

export function TxList() {
  const txMap = useTxMap()
  const txList = useMemo(() => Object.values(txMap), [txMap])

  if (!txList.length) {
    return <p className="text-red-400">No transactions yet.</p>
  }

  return (
    <div className="space-y-2">
      {txList.map((tx) => (
        <div
          key={tx.id}
          className="p-3 bg-gray-100 rounded"
        >
          <p>Status: {tx.status}</p>
          <p>Chain: {tx.chainId}</p>
        </div>
      ))}
    </div>
  )
}
