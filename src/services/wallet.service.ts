/*
This is the only place we work with window.ethereum.
*/

import { DEFAULT_CHAIN } from '@/config/chains';

export class WalletService {
  private ethereum?: any;

  constructor() {
    if (typeof window !== 'undefined') {
      this.ethereum = (window as any).ethereum;
    }
  }

  isAvailable() {
    return !!this.ethereum;
  }

  async connect() {
    if (!this.ethereum) {
      throw new Error('Wallet not available');
    }

    const accounts = await this.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const chainId = await this.ethereum.request({
      method: 'eth_chainId'
    });

    return {
      address: accounts[0],
      chainId: parseInt(chainId, 16)
    };
  }

  async getCurrentAccount() {
    const accounts = await this.ethereum.request({
      method: 'eth_accounts'
    });

    return accounts[0] ?? null;
  }

  async getChainId() {
    const chainId = await this.ethereum.request({
      method: 'eth_chainId'
    });

    return parseInt(chainId, 16);
  }

  onAccountsChanged(callback: (accounts: string[]) => void) {
    this.ethereum?.on('accountsChanged', callback);
  }

  onChainChanged(callback: (chainId: string) => void) {
    this.ethereum?.on('chainChanged', callback);
  }

  async switchChain(chainIdHex: string) {
    await this.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    });
  }

  async switchToDefaultChain() {
    return this.switchChain(DEFAULT_CHAIN.hex)
  }

}
