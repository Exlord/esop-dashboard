import { TxList } from '@/features/tx/components/TxList';
import { ConnectButton } from '@/features/wallet/components/ConnectButton';
import { NetworkWarning } from '@/features/wallet/components/NetworkWarning';

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        ESOP Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-white rounded-xl shadow">
          Token Overview

          <NetworkWarning />
          <ConnectButton />
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <TxList />
        </div>
      </div>
    </main>
  );
}
