export const QueryKeys = {
  tokenBalance: (address: string, chainId: number) =>
    ['tokenBalance', address, chainId] as const,

  tokenAllowance: (
    owner: string,
    spender: string,
    chainId: number
  ) =>
    ['tokenAllowance', owner, spender, chainId] as const
}
