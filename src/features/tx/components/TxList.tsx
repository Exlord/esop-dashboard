"use client"

import { useAllTxs } from "@/store/tx.selectors"

export function TxList() {
  const txs = useAllTxs()

  if (!txs.length) {
    return <p>No transactions yet</p>
  }

  return (
    <div className="space-y-2">
      {txs.map((tx) => (
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
