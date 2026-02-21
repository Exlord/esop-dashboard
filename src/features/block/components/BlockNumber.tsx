'use client';

import { useBlockStore } from '@/store/block.store';

export function BlockNumber() {
  const blockNumber = useBlockStore((s) => s.blockNumber);

  return (
    <div className="space-y-2">
      {blockNumber}
    </div>
  );
}
