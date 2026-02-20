export const TOKEN_ABI = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ]
  }
] as const;

//: { [key: string]: { address: { [chainId: number]: string }, abi: any } }
export const CONTRACTS = {
  TOKEN: {
    address: {
      137: '0x...', // Polygon
      1: '0x...'   // Ethereum
    },
    abi: TOKEN_ABI
  }
} as const;
