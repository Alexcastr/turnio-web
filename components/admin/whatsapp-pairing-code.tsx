'use client';

import { useEffect, useState } from 'react';
import { Copy, Check, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface WhatsAppPairingCodeProps {
  pairingCode: string;
  expiresAt: string;
  refreshing: boolean;
  onRefresh: () => void;
}

export function WhatsAppPairingCode({
  pairingCode,
  expiresAt,
  refreshing,
  onRefresh,
}: WhatsAppPairingCodeProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function computeSeconds() {
      return Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    }
    setSecondsLeft(computeSeconds());
    const interval = setInterval(() => {
      const s = computeSeconds();
      setSecondsLeft(s);
      if (s === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  function handleCopy() {
    navigator.clipboard.writeText(pairingCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const expired = secondsLeft === 0;
  const progress = Math.max(0, (secondsLeft / 58) * 100);

  // Format code as XXXX-XXXX if 8 chars, otherwise as-is
  const formatted =
    pairingCode.length === 8 && !pairingCode.includes('-')
      ? `${pairingCode.slice(0, 4)}-${pairingCode.slice(4)}`
      : pairingCode;

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'flex flex-col items-center gap-3 p-6 rounded-xl border',
          expired ? 'border-border bg-surface opacity-60' : 'border-primary/40 bg-primary/5',
        )}
      >
        <p className="text-xs font-medium text-text-secondary uppercase tracking-widest">
          Código de vinculación
        </p>
        <p className="text-4xl font-mono font-bold tracking-[0.2em] text-text-primary select-all">
          {formatted}
        </p>

        {/* Countdown bar */}
        <div className="w-full flex flex-col gap-1">
          <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000',
                secondsLeft > 15 ? 'bg-primary' : 'bg-status-cancelled',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1 justify-center">
            <Clock className="w-3 h-3 text-text-secondary" />
            <span className={cn('text-xs', secondsLeft <= 15 ? 'text-status-cancelled' : 'text-text-secondary')}>
              {expired ? 'Código expirado' : `Expira en ${secondsLeft}s`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={handleCopy}
          disabled={expired}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado' : 'Copiar código'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={onRefresh}
          loading={refreshing}
        >
          {!refreshing && <RefreshCw className="w-4 h-4" />}
          Nuevo código
        </Button>
      </div>

      <p className="text-xs text-text-secondary text-center">
        Abre WhatsApp → Dispositivos vinculados → Vincular con número de teléfono
      </p>
    </div>
  );
}
