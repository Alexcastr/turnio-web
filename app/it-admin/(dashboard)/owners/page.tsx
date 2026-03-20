'use client';

import { useRef, useState } from 'react';
import { useOwners } from '@/lib/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';

export default function OwnersPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const { data, isLoading, isError } = useOwners({
    search: debouncedSearch || undefined,
    page,
    limit,
  });

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  }

  const owners = data?.items ?? [];
  const meta = data?.meta;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          Propietarios
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Lista de propietarios y sus negocios.
        </p>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por nombre, email o negocio..."
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-150"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <Card padding="lg">
          <p className="text-sm text-status-cancelled text-center">
            Error al cargar propietarios. Verifica tu sesión.
          </p>
        </Card>
      )}

      {!isLoading && !isError && owners.length === 0 && (
        <Card padding="lg">
          <p className="text-sm text-text-secondary text-center">
            {debouncedSearch
              ? 'No se encontraron resultados.'
              : 'No hay propietarios creados aún.'}
          </p>
        </Card>
      )}

      {!isLoading && owners.length > 0 && (
        <div className="flex flex-col gap-3">
          {owners.map((owner) => (
            <Card key={owner.id} padding="none">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {owner.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Mail className="w-3.5 h-3.5 text-text-secondary shrink-0" />
                    <span className="text-xs text-text-secondary truncate">
                      {owner.email}
                    </span>
                  </div>
                </div>

                {owner.business && (
                  <div className="flex items-start gap-2 sm:text-right">
                    <Building2 className="w-4 h-4 text-text-secondary shrink-0 mt-0.5 sm:hidden" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {owner.business.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-text-secondary">
                          {owner.business.category}
                        </span>
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full ${
                            owner.business.isActive
                              ? 'bg-status-confirmed'
                              : 'bg-status-cancelled'
                          }`}
                        />
                        <span className="text-xs text-text-secondary">
                          {owner.business.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-text-secondary" />
                        <span className="text-xs text-text-secondary">
                          {owner.business.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-text-secondary">
                {meta.total} propietario{meta.total !== 1 ? 's' : ''} — Página{' '}
                {meta.page} de {meta.totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
