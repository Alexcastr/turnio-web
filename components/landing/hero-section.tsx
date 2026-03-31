'use client';

import { useState, useEffect } from 'react';
import { Search, CalendarCheck, Loader2, Store } from 'lucide-react';
import { useBusinesses } from '@/lib/hooks/use-businesses';
import { BusinessCard } from './business-card';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isFetching } = useBusinesses(debouncedSearch, page);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary-light via-background to-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        {/* Hero copy */}
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary-dark">
              Reservas en línea
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Reserva tu cita{' '}
            <span className="text-primary">en segundos</span>
          </h1>

          <p className="mb-8 text-lg text-text-secondary">
            Encuentra tu negocio favorito y agenda tu cita de forma rápida y
            sencilla. Sin llamadas, sin esperas.
          </p>
        </div>

        {/* Search bar */}
        <div className="mx-auto mb-8 max-w-lg">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar negocio por nombre..."
              className="w-full rounded-xl border border-border bg-surface-elevated py-3 pl-12 pr-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {isFetching && (
              <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-text-secondary" />
            )}
          </div>
        </div>

        {/* Business list */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Store className="h-5 w-5 text-text-secondary" />
            <h2 className="text-sm font-medium text-text-secondary">
              {data
                ? `${data.meta.total} negocio${data.meta.total !== 1 ? 's' : ''} disponible${data.meta.total !== 1 ? 's' : ''}`
                : 'Cargando negocios...'}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : data && data.items.length > 0 ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.items.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>

              {/* Pagination */}
              {data.meta.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-text-secondary">
                    {page} de {data.meta.totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= data.meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-surface-elevated p-8 text-center">
              <Store className="mx-auto mb-3 h-8 w-8 text-text-secondary" />
              <p className="text-text-secondary">
                {debouncedSearch
                  ? 'No se encontraron negocios con ese nombre.'
                  : 'No hay negocios disponibles en este momento.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
