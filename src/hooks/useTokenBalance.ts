import { useQuery } from '@tanstack/react-query'
import { useBlockStore } from '@/store/block.store'
import { createTokenContract } from '@/modules/token'
import { useWallet } from '@/features/wallet/hooks/useWallet'
import { QueryKeys } from '@/lib/queryKeys';

export function useTokenBalance() {
  const { address, chainId } = useWallet()

  return useQuery({
    queryKey: QueryKeys.tokenBalance( address!, chainId!),
    queryFn: async () => {
      if (!address || !chainId) return

      const token = createTokenContract(chainId)
      return token.balanceOf(address)
    },
    enabled: !!address && !!chainId,

    // 👇 THIS is key
    refetchOnWindowFocus: false,
    staleTime: 0
  })
}
