/*
Why this matters
Now:
Providers are centralized
Wallet logic is decoupled
Contracts can be stateless
-------------------------------------------------
⚠️ Critical Rule
❌ NEVER use wallet provider for reads by default

Why?
slower
depends on wallet state
can break UX
*/

import { JsonRpcProvider, BrowserProvider } from 'ethers';

class ProviderService {
  private readProvider: JsonRpcProvider;

  private browserProvider?: BrowserProvider;

  constructor() {
    // Polygon RPC
    // TODO do we need multichain ?
    this.readProvider = new JsonRpcProvider(
      'https://polygon-rpc.com'
    );
  }

  // -------- READ --------
  getReadProvider() {
    return this.readProvider;
  }

  // -------- WALLET --------
  setWalletProvider(ethereum: any) {
    this.browserProvider = new BrowserProvider(ethereum);
  }

  getBrowserProvider() {
    if (!this.browserProvider) {
      throw new Error('Wallet not connected');
    }
    return this.browserProvider;
  }

  // -------- SIGNER --------
  async getSigner() {
    if (!this.browserProvider) {
      throw new Error('No wallet provider');
    }

    return await this.browserProvider.getSigner();
  }

  // -------- RESET --------
  reset() {
    this.browserProvider = undefined;
  }
}

export const providerService = new ProviderService();
