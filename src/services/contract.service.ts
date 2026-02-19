import { Contract } from 'ethers';
import { providerService } from './provider.service';

export class ContractService {
  getReadContract(address: string, abi: any) {
    const provider = providerService.getReadProvider();
    return new Contract(address, abi, provider);
  }

  async getWriteContract(address: string, abi: any) {
    const signer = await providerService.getSigner();
    return new Contract(address, abi, signer);
  }
}

export const contractService = new ContractService();
