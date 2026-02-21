'use client';

import { useWallet } from '../hooks/useWallet';
import { WalletService } from '@/services/wallet.service';
import { useNetworkGuard } from '@/hooks/useNetworkGuard';

const walletService = new WalletService();

export function NetworkWarning() {
  const { isConnected } = useWallet();
  const { isCorrectNetwork, chainId, isReadOnly } = useNetworkGuard();

  if (!isConnected) return (
    <div>Not Connected.</div>
  );

  if (isCorrectNetwork) return (
    <div>Connected to : {chainId}</div>
  );

  if (!isConnected || isCorrectNetwork) return null;

  return (
    <div className="p-3 bg-red-500 text-white rounded">
      <p>Wrong network. Please switch to Polygon.</p>

      <button
        onClick={() => walletService.switchToDefaultChain()}
        className="mt-2 px-3 py-1 bg-white text-black rounded"
      >
        Switch Network
      </button>
    </div>
  );
}
