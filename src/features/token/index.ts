import { TokenContract } from '@/features/token/token.contract';

export const createTokenContract = (chainId: number) => {
  return new TokenContract(chainId)
}
