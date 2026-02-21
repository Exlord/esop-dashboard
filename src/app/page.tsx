import { TxList } from '@/features/tx/components/TxList';
import { ConnectButton } from '@/features/wallet/components/ConnectButton';
import { NetworkWarning } from '@/features/wallet/components/NetworkWarning';
import { BlockNumber } from '@/features/block/components/BlockNumber';

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        ESOP Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        <fieldset className="border p-2">
          <legend className="p-2">Network Warning</legend>
          <NetworkWarning />
        </fieldset>

        <fieldset className="border p-2">
          <legend className="p-2">Connect Button</legend>
          <ConnectButton />
        </fieldset>

        <fieldset className="border p-2">
          <legend className="p-2">BlockNumber</legend>
          <BlockNumber />
        </fieldset>


        <fieldset className="border p-2">
          <legend className="p-2">Transactions</legend>
          <TxList />
        </fieldset>

      </div>
    </main>
  );
}
