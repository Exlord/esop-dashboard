import { useQuery } from '@tanstack/react-query';
import { providerService } from '@/services/provider.service';

export function useBalance(address: string) {
  return useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      const provider = providerService.getReadProvider();
      return await provider.getBalance(address);
    }
  });
}
