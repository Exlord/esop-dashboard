export type TxStatusAwaitingSignature = 'awaiting_signature';
export type TxStatus =
  | TxStatusAwaitingSignature
  | "pending"
  | "confirmed"
  | "failed"
  | "replaced"
  | "stuck"

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
