/*
Subtle but Important
This hook:
is event-driven
is reactive
syncs global state


*/

import { useEffect } from 'react';
import { WalletService } from '@/services/wallet.service';
import { useWalletStore } from '@/store/wallet.store';
import { providerService } from "@/services/provider.service"

const walletService = new WalletService();

export function useWallet() {
  const {
    address,
    chainId,
    isConnected,
    isConnecting,
    setWallet,
    reset,
    setConnecting
  } = useWalletStore();

  const connect = async () => {
    try {
      setConnecting(true)

      const { address, chainId } =
        await walletService.connect()

      providerService.setWalletProvider(
        (window as any).ethereum
      )

      setWallet({ address, chainId })
    } catch (err) {
      reset();
      throw err;
    }
  };

  // listen to wallet changes
  useEffect(() => {
    if (!walletService.isAvailable()) return;

    walletService.onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        reset();
      } else {
        setWallet({
          address: accounts[0],
          chainId: chainId!
        });
      }
    });

    walletService.onChainChanged((chainIdHex) => {
      const newChainId = parseInt(chainIdHex, 16);

      setWallet({
        address: address!,
        chainId: newChainId
      });
    });
  }, [address, chainId]);

  return {
    address,
    chainId,
    isConnected,
    isConnecting,

    connect
  };
}
