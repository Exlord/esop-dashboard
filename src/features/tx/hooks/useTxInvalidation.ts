'use client'

import { useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTxStore } from '@/store/tx.store'
import { QueryKeys } from '@/lib/queryKeys';

export function useTxInvalidation() {
  const queryClient = useQueryClient()

  // subscribe only to confirmed tx ids (stable + minimal)
  const confirmedTxIds = useTxStore((state) =>
    Object.values(state.txs)
      .filter((tx) => tx.status === 'confirmed')
      .map((tx) => tx.id)
  )

  // track which ones we've already processed
  const processedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const store = useTxStore.getState()

    for (const id of confirmedTxIds) {
      if (processedRef.current.has(id)) continue

      const tx = store.txs[id]
      if (!tx) continue

      // 🔥 invalidate only affected balance
      queryClient.invalidateQueries({
        queryKey: QueryKeys.tokenBalance(tx.from, tx.chainId)
      })

      processedRef.current.add(id)
    }
  }, [confirmedTxIds, queryClient])
}
