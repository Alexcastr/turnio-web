'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils/cn';
import {
  Users,
  UserPlus,
  Building2,
  UserCheck,
  LogOut,
  Shield,
  Menu,
  X,
  MessageCircle,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_ITEMS = [
  {
    label: 'Propietarios',
    href: '/it-admin/owners',
    icon: Users,
  },
  {
    label: 'Nuevo Owner & Negocio',
    href: '/it-admin/provision-owner',
    icon: UserPlus,
  },
  {
    label: 'Vincular a Negocio',
    href: '/it-admin/assign-user',
    icon: UserCheck,
  },
  {
    label: 'Negocio para Usuario',
    href: '/it-admin/create-business',
    icon: Building2,
  },
  {
    label: 'WhatsApp Turnio',
    href: '/it-admin/whatsapp',
    icon: MessageCircle,
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await authClient.signOut();
    router.push('/it-admin/login');
  }

  function navigateTo(href: string) {
    setMobileOpen(false);
    router.push(href);
  }

  const navContent = (
    <>
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigateTo(item.href)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer w-full text-left',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary',
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border flex flex-col gap-2">
        <div className="flex items-center justify-between px-3">
          <span className="text-xs text-text-secondary">Tema</span>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-status-cancelled transition-colors duration-150 cursor-pointer w-full"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-text-primary">Turnio Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-surface-elevated text-text-secondary cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden fixed top-14.25 left-0 bottom-0 z-30 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {navContent}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 flex-col border-r border-border bg-surface shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-text-primary">Turnio Admin</span>
        </div>
        {navContent}
      </aside>
    </>
  );
}
