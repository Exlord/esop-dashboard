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

  chainId: number
  from: string
  to?: string
  value?: string

  status: TxStatus

  createdAt: number
  updatedAt: number

  replacedBy?: string
  error?: string

  /**
   * the block height at the moment the tx enters the mempool (i.e., right after submission)
   *     Why startBlock Matters?
   *     Without startBlock:
   *     “stuck” detection is unreliable ❌
   *     you don’t know how long tx has been pending ❌
   *     UX cannot show meaningful feedback ❌
   */
  startBlock?: number
}
