'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { KeyRound, CheckCircle2, Smartphone, ExternalLink } from 'lucide-react';

// ─── Success screen ──────────────────────────────────────────────────────────

function SuccessScreen() {
  const [appOpened, setAppOpened] = useState(false);

  function openApp() {
    // Try deep link; if the app isn't installed the browser ignores it
    window.location.href = 'turnio://login';
    setAppOpened(true);
  }

  // Auto-attempt on mount (gives the best UX — if app is installed it just opens)
  useEffect(() => {
    const timer = setTimeout(() => openApp(), 600);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card padding="lg" className="w-full max-w-sm">
        {/* Icon + heading */}
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">
            ¡Todo listo!
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Tu contraseña ha sido configurada. Abre la app de Turnio para
            gestionar tu negocio.
          </p>
        </div>

        {/* Primary CTA — open app */}
        <Button className="w-full" onClick={openApp}>
          <Smartphone className="w-4 h-4" />
          Abrir Turnio
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <hr className="flex-1 border-border" />
          <span className="text-xs text-text-secondary">
            {appOpened ? '¿No se abrió la app?' : '¿No tienes la app?'}
          </span>
          <hr className="flex-1 border-border" />
        </div>

        {/* Store links */}
        <div className="flex flex-col gap-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.turnio.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-elevated transition-colors"
          >
            {/* Play Store icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.99.2L15.39 12 11.97 8.57 3.18 23.76zm17.12-12.93c-.56-.32-4.67-2.67-5.84-3.34l-3.27 3.27 3.27 3.27 5.78-3.3c.62-.35.86-.94.06-1.9zM2.3.25C2.1.47 2 .79 2 1.21v21.58c0 .42.1.74.3.96l.05.05 12.09-12.09v-.28L2.35.2l-.05.05zm8.96 12.38L2.3 21.57V2.43l8.96 10.2z" />
            </svg>
            Descargar en Google Play
            <ExternalLink className="w-3 h-3 text-text-secondary ml-auto" />
          </a>
        </div>
      </Card>
    </div>
  );
}

// ─── Set password form ───────────────────────────────────────────────────────

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card padding="lg" className="w-full max-w-sm text-center">
          <p className="text-sm text-status-cancelled">
            El enlace es inválido o ha expirado. Solicita que te reenvíen la
            invitación.
          </p>
        </Card>
      </div>
    );
  }

  if (done) return <SuccessScreen />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token: token!,
      });

      if (result.error) {
        setError(result.error.message || 'El enlace es inválido o ha expirado.');
        setLoading(false);
        return;
      }

      setDone(true);
    } catch {
      setError('Error de conexión. Verifica tu internet e inténtalo de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card padding="lg" className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary">
            Configura tu contraseña
          </h1>
          <p className="text-sm text-text-secondary text-center">
            Elige una contraseña segura para tu cuenta de Turnio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nueva contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
          {error && (
            <p className="text-xs text-status-cancelled">{error}</p>
          )}
          <Button type="submit" loading={loading} className="w-full mt-1">
            Guardar contraseña
          </Button>
        </form>
      </Card>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SetPasswordPage() {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
}
