import { Contract } from 'ethers';
import { providerService } from './provider.service';

export class ContractFactory {
  getRead<TAbi extends readonly any[]>(
    address: string,
    abi: TAbi
  ) {
    const provider = providerService.getReadProvider();
    return new Contract(address, abi, provider);
  }

  async getWrite<TAbi extends readonly any[]>(
    address: string,
    abi: TAbi
  ) {
    const signer = await providerService.getSigner();
    return new Contract(address, abi, signer);
  }
}

export const contractFactory = new ContractFactory();
