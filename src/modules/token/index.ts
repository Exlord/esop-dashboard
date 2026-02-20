import { TokenContract } from '@/modules/token/token.contract';

export const createTokenContract = (chainId: bigint) => {
  return new TokenContract(chainId)
}
