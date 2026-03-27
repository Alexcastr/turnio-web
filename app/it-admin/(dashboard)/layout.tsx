import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ToastContainer } from '@/components/admin/toast';
import { API_BASE_URL } from '@/lib/constants';

const LOGIN_PATH = '/it-admin/login';
const SESSION_COOKIE_BASE = 'better-auth.session_token';

function extractSessionToken(cookieEntries: { name: string; value: string }[]) {
  const exactNames = [
    SESSION_COOKIE_BASE,
    `__Secure-${SESSION_COOKIE_BASE}`,
    `__Host-${SESSION_COOKIE_BASE}`,
  ];

  for (const name of exactNames) {
    const cookie = cookieEntries.find((entry) => entry.name === name);
    if (cookie?.value) {
      return cookie.value;
    }
  }

  const chunkPrefixes = [
    `${SESSION_COOKIE_BASE}.`,
    `__Secure-${SESSION_COOKIE_BASE}.`,
    `__Host-${SESSION_COOKIE_BASE}.`,
  ];

  for (const prefix of chunkPrefixes) {
    const chunks = cookieEntries
      .filter((entry) => entry.name.startsWith(prefix))
      .map((entry) => {
        const indexPart = entry.name.slice(prefix.length);
        return { index: Number(indexPart), value: entry.value };
      })
      .filter((chunk) => Number.isInteger(chunk.index))
      .sort((a, b) => a.index - b.index);

    if (chunks.length > 0) {
      return chunks.map((chunk) => chunk.value).join('');
    }
  }

  return null;
}

async function assertItAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = extractSessionToken(cookieStore.getAll());

  if (!sessionToken) {
    redirect(LOGIN_PATH);
  }

  const response = await fetch(`${API_BASE_URL}/business/admin/owners?page=1&limit=1`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
    cache: 'no-store',
  }).catch(() => null);

  if (!response || response.status === 401 || response.status === 403) {
    redirect(LOGIN_PATH);
  }
}

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await assertItAdminSession();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 min-w-0 pt-14.25 md:pt-0">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {children}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
