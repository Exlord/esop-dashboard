import { TxList } from '@/features/tx/components/TxList';
import { ConnectButton } from '@/features/wallet/components/ConnectButton';
import { NetworkWarning } from '@/features/wallet/components/NetworkWarning';
import { BlockNumber } from '@/features/block/components/BlockNumber';
import { useTxInvalidation } from '@/features/tx/hooks/useTxInvalidation';


export default function HomePage() {

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        ESOP Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-2">
        <fieldset>
          <legend>Network Warning</legend>
          <NetworkWarning />
        </fieldset>

        <fieldset>
          <legend>Connect Button</legend>
          <ConnectButton />
        </fieldset>

        <fieldset>
          <legend>BlockNumber</legend>
          <BlockNumber />
        </fieldset>


        <fieldset>
          <legend>Transactions</legend>
          <TxList />
        </fieldset>

      </div>
    </main>
  );
}
