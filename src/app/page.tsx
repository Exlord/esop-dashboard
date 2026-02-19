import { TxList } from '@/features/tx/components/TxList';

export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        ESOP Dashboard
      </h1>

      <TxList />
    </main>
  );
}
