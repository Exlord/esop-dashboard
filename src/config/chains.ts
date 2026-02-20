/*
Why this matters

Single source of truth
Avoid hardcoding chainId everywhere
Enables multi-chain later
 */

import { Chain } from '@/types/chain';

export const SUPPORTED_CHAINS: { [network: string]: Chain } = {
  POLYGON: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    hex: '0x89'
  }
} as const;

export const DEFAULT_CHAIN = SUPPORTED_CHAINS.POLYGON;
