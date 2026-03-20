import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turnio Admin',
  robots: { index: false, follow: false },
};

export default function ItAdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
