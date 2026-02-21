'use client';

import { useWallet } from '../hooks/useWallet';
import { useMounted } from '@/hooks/useMounted';

export function ConnectButton() {
  const mounted = useMounted();
  const { connect, isAvailable, isConnected, address, isConnecting } = useWallet();

  // if (!mounted) return null;
  console.log(typeof window);
  if (typeof window === 'undefined') return null;

  if (!isAvailable) {
    return (
      <div className="text-red-400">No wallet extension detected!</div>
    );
  }

  if (isConnected && address) {
    return (
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        Connected to : «{address?.slice(0, 6)}...{address?.slice(-4)}»
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
