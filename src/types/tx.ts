export type TxStatus =
  | 'awaiting_signature'
  | 'pending'
  | 'confirmed'
  | 'failed'
  | 'replaced'
  | 'stuck';

export type Tx = {
  id: string

  hash?: string
  nonce?: number

  chainId: bigint
  from: string
  to?: string
  value?: string

  status: TxStatus

  createdAt: number
  updatedAt: number

  replacedBy?: string
  error?: string

  startBlock?: number
}
