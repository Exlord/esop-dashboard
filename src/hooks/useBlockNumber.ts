import { useEffect } from 'react'
import { providerService } from '@/services/provider.service'
import { useBlockStore } from '@/store/block.store'

/**
 * Now Everything Can React to Block Changes
 */
export function useBlockSubscription() {
  useEffect(() => {
    const provider = providerService.getReadProvider()

    const handler = (blockNumber: number) => {
      useBlockStore.getState().setBlock(blockNumber)
    }

    provider.on('block', handler)

    return () => {
      provider.off('block', handler)
    }
  }, [])
}
