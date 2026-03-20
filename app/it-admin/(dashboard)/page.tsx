'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ItAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/it-admin/owners');
  }, [router]);

  return null;
}
