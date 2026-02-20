import { contractFactory } from '@/services/contract.factory';
import { CONTRACTS } from '@/config/contracts';
import { SupportedChainId } from '@/types/chain';
import { ERC20_ABI } from '@/abi/erc20'

export class TokenContract {
  constructor(private chainId: SupportedChainId) {}

  public get address() {
    return CONTRACTS.TOKEN.address[this.chainId];
  }

  private getRead() {
    return contractFactory.getRead(this.address, ERC20_ABI);
  }

  private async getWrite() {
    return contractFactory.getWrite(this.address, ERC20_ABI);
  }

  // READ
  async balanceOf(user: string) {
    const contract = this.getRead();
    return contract.balanceOf(user);
  }

  // SIMULATION
  async simulateTransfer(to: string, amount: bigint) {
    const contract = this.getRead();

    await contract.transfer.staticCall(to, amount);
  }

  // PREPARE TX
  async prepareTransfer(to: string, amount: bigint) {
    const contract = this.getRead();

    await this.simulateTransfer(to, amount);

    const gasLimit = await contract.transfer.estimateGas(to, amount);

    const tx = await contract.transfer.populateTransaction(to, amount);

    return {
      ...tx,
      gasLimit
    };
  }

  // SEND (optional shortcut)
  async sendTransfer(to: string, amount: bigint) {
    const contract = await this.getWrite();
    return contract.transfer(to, amount);
  }
}
