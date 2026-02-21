'use client';

import dynamic from 'next/dynamic';

// no ssr for dashboard
const DashboardLayout = dynamic(() => import('@/features/dashboard/Layout'), {
  ssr: false
});

export default function HomePage() {

  return (
    <DashboardLayout />
  );
}
