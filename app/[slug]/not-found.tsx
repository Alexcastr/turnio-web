'use client';

import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export default function BusinessNotFound() {
  function goToApp() {
    // Try deep link; if the app isn't installed the browser ignores it
    window.location.href = 'turnio://';
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface">
          <SearchX className="h-8 w-8 text-text-secondary" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-text-primary">
          Negocio no encontrado
        </h1>
        <p className="mb-6 text-sm text-text-secondary">
          El negocio que buscas no existe o no está disponible.
        </p>
        <Button variant="secondary" onClick={goToApp}>
          Volver al inicio
        </Button>
      </div>
    </main>
  );
}
