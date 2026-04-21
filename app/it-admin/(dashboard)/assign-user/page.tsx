'use client';

import { useState, useEffect, useRef } from 'react';
import { useAssignUser, useSearchAdminUsers, useSearchAdminBusinesses } from '@/lib/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/admin/toast';
import { Search, User, Building2, X, AlertTriangle } from 'lucide-react';
import type { AdminUser, AdminBusiness } from '@/lib/api/admin';

type UserOption = { id: string; name: string; email: string };
type BusinessOption = { id: string; name: string; category: string; currentOwnerName?: string };

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function UserCombobox({ onSelect }: { onSelect: (u: UserOption | null) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dq = useDebounce(query, 300);
  const { data, isLoading } = useSearchAdminUsers(dq, open);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function select(u: AdminUser) {
    const opt = { id: u.id, name: u.name, email: u.email };
    setSelected(opt);
    onSelect(opt);
    setOpen(false);
    setQuery('');
  }

  function clear() { setSelected(null); onSelect(null); }

  if (selected) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/5">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">{selected.name}</p>
          <p className="text-xs text-text-secondary truncate">{selected.email}</p>
        </div>
        <button type="button" onClick={clear} className="p-1 hover:bg-surface-hover rounded-lg transition-colors cursor-pointer">
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar por nombre o email..."
          className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-40 rounded-xl border border-border bg-surface shadow-xl overflow-hidden">
          {isLoading ? (
            <p className="px-4 py-3 text-xs text-text-secondary">Buscando...</p>
          ) : !data?.items?.length ? (
            <p className="px-4 py-3 text-xs text-text-secondary">Sin resultados</p>
          ) : (
            <ul className="max-h-52 overflow-y-auto">
              {data.items.map(u => (
                <li key={u.id}>
                  <button type="button" onClick={() => select(u)} className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-surface-hover transition-colors cursor-pointer">
                    <User className="w-4 h-4 text-text-secondary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-text-primary truncate">{u.name}</p>
                      <p className="text-xs text-text-secondary truncate">{u.email}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function BusinessCombobox({ onSelect }: { onSelect: (b: BusinessOption | null) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BusinessOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const dq = useDebounce(query, 300);
  const { data, isLoading } = useSearchAdminBusinesses(dq, open);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function select(b: AdminBusiness) {
    const currentOwner = b.staff?.[0];
    const opt = { id: b.id, name: b.name, category: b.category, currentOwnerName: currentOwner?.name };
    setSelected(opt);
    onSelect(opt);
    setOpen(false);
    setQuery('');
  }

  function clear() { setSelected(null); onSelect(null); }

  if (selected) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{selected.name}</p>
            <p className="text-xs text-text-secondary truncate">{selected.category}</p>
          </div>
          <button type="button" onClick={clear} className="p-1 hover:bg-surface-hover rounded-lg transition-colors cursor-pointer">
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
        {selected.currentOwnerName && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Este negocio ya tiene owner: <span className="font-medium">{selected.currentOwnerName}</span>. Será reemplazado.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar negocio por nombre..."
          className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-40 rounded-xl border border-border bg-surface shadow-xl overflow-hidden">
          {isLoading ? (
            <p className="px-4 py-3 text-xs text-text-secondary">Buscando...</p>
          ) : !data?.items?.length ? (
            <p className="px-4 py-3 text-xs text-text-secondary">Sin resultados</p>
          ) : (
            <ul className="max-h-52 overflow-y-auto">
              {data.items.map(b => (
                <li key={b.id}>
                  <button type="button" onClick={() => select(b)} className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-surface-hover transition-colors cursor-pointer">
                    <Building2 className="w-4 h-4 text-text-secondary shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-text-primary truncate">{b.name}</p>
                      <p className="text-xs text-text-secondary truncate">{b.category}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function AssignUserPage() {
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessOption | null>(null);
  const { mutate, isPending } = useAssignUser();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser || !selectedBusiness) {
      toast('error', 'Selecciona un usuario y un negocio');
      return;
    }
    mutate(
      { userId: selectedUser.id, businessId: selectedBusiness.id, role: 'OWNER' },
      {
        onSuccess: () => {
          toast('success', 'Owner vinculado exitosamente');
          setSelectedUser(null);
          setSelectedBusiness(null);
        },
        onError: err => toast('error', err.message || 'Error al vincular'),
      },
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">Vincular Owner a Negocio</h1>
        <p className="text-sm text-text-secondary mt-1">
          Asigna un usuario como propietario de un negocio existente.
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary flex items-center gap-1.5">
              <User className="w-4 h-4" /> Usuario
            </label>
            <UserCombobox onSelect={setSelectedUser} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Negocio
            </label>
            <BusinessCombobox onSelect={setSelectedBusiness} />
          </div>

          <Button type="submit" loading={isPending} disabled={!selectedUser || !selectedBusiness} className="w-full">
            Vincular como Owner
          </Button>
        </form>
      </Card>
    </div>
  );
}
