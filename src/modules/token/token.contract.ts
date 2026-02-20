import { CONTRACTS } from '@/config/contracts';
import { contractFactory } from '@/services/contract.factory';
import { parseUnits } from 'ethers';
import { SupportedChainId } from '@/types/chain';

export class TokenContract {
  private readonly chainId: SupportedChainId;

  private config = CONTRACTS.TOKEN;

  constructor(chainId: SupportedChainId) {
    this.chainId = chainId;
  }

  public get address() {
    const addr = CONTRACTS.TOKEN.address[this.chainId]

    if (!addr) {
      throw new Error(`Unsupported chain: ${this.chainId}`)
    }

    return addr
  }

  private get abi() {
    return CONTRACTS.TOKEN.abi
  }

  // READ
  getRead() {
    return contractFactory.getRead(
      this.address,
      this.abi
    );
  }

  // WRITE
  async getWrite() {
    return await contractFactory.getWrite(
      this.address,
      this.abi
    );
  }

  // DOMAIN METHODS

  async balanceOf(address: string) {
    const contract = this.getRead();
    return await contract.balanceOf(address);
  }

  async transfer(to: string, amount: string) {
    const contract = await this.getWrite();

    return contract.transfer(
      to,
      parseUnits(amount, 18)
    );
  }
}
