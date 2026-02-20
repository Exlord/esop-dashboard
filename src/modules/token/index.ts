import { TokenContract } from '@/modules/token/token.contract';
import { SupportedChainId } from '@/types/chain';

/**
 * I restrict chainId to a SupportedChainId union and validate it at runtime to ensure only supported networks are used
 * @param chainId
 */
function assertSupportedChain(chainId: SupportedChainId): asserts chainId is SupportedChainId {
  if (![1, 137].includes(chainId)) {
    throw new Error(`Unsupported chain: ${chainId}`);
  }
}

export const createTokenContract = (chainId: SupportedChainId) => {
  // Runtime guard (VERY important)
  assertSupportedChain(chainId);
  return new TokenContract(chainId);
};
