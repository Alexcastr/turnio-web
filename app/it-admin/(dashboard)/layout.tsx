import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ToastContainer } from '@/components/admin/toast';

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
