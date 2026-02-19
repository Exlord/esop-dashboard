'use client';

import { useWallet } from '../hooks/useWallet';

export function ConnectButton() {
  const { connect, isConnected, address, isConnecting } = useWallet();

  if (isConnected) {
    return (
      <button className="px-4 py-2 bg-green-500 text-white rounded">
        {address?.slice(0, 6)}...{address?.slice(-4)}
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
