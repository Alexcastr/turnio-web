'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Wifi, WifiOff, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WhatsAppPairingCode } from '@/components/admin/whatsapp-pairing-code';
import { toast } from '@/components/admin/toast';
import {
  useSharedWaStatus,
  useSetupSharedWa,
  useSharedWaPairingCode,
  useDisconnectSharedWa,
} from '@/lib/hooks/use-admin';
import { useQueryClient } from '@tanstack/react-query';

type View = 'phone-form' | 'pairing';

interface PairingState {
  code: string;
  expiresAt: string;
}

export function WhatsAppSharedPanel() {
  const queryClient = useQueryClient();
  const { data: status, isLoading, isError, error } = useSharedWaStatus();
  const setupMutation = useSetupSharedWa();
  const pairingMutation = useSharedWaPairingCode();
  const disconnectMutation = useDisconnectSharedWa();

  const [view, setView] = useState<View>('phone-form');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [pairing, setPairing] = useState<PairingState | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // When status loads and instance exists but not connected, stay on phone-form
  // When connected, stop polling
  useEffect(() => {
    if (status?.connected) {
      stopPolling();
    }
  }, [status?.connected]);

  function startPolling() {
    stopPolling();
    pollRef.current = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['admin-shared-wa-status'] });
    }, 3000);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  // Cleanup on unmount
  useEffect(() => () => stopPolling(), []);

  async function handleSetup() {
    setupMutation.mutate(undefined, {
      onError: (err) => toast('error', err.message || 'Error al crear la instancia'),
    });
  }

  async function handleRequestCode() {
    if (!phone.trim()) {
      setPhoneError('Ingresa el número de teléfono');
      return;
    }
    setPhoneError('');

    pairingMutation.mutate(phone.trim(), {
      onSuccess: (data) => {
        setPairing({ code: data.pairingCode, expiresAt: data.expiresAt });
        setView('pairing');
        startPolling();
      },
      onError: (err) => toast('error', err.message || 'Error al generar el código'),
    });
  }

  async function handleRefreshCode() {
    pairingMutation.mutate(phone.trim(), {
      onSuccess: (data) => {
        setPairing({ code: data.pairingCode, expiresAt: data.expiresAt });
      },
      onError: (err) => toast('error', err.message || 'Error al renovar el código'),
    });
  }

  function handleDisconnect() {
    disconnectMutation.mutate(undefined, {
      onSuccess: () => {
        toast('success', 'WhatsApp desconectado');
        setView('phone-form');
        setPairing(null);
      },
      onError: (err) => toast('error', err.message || 'Error al desconectar'),
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-text-secondary">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Verificando estado...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <AlertCircle className="w-8 h-8 text-status-cancelled" />
        <p className="text-sm text-text-secondary">{(error as Error).message}</p>
        <Button variant="secondary" size="sm" onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-shared-wa-status'] })}>
          Reintentar
        </Button>
      </div>
    );
  }

  // Not created yet
  if (!status?.configured) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-primary" />
        </div>
        <div>
          <p className="font-medium text-text-primary">Instancia no creada</p>
          <p className="text-sm text-text-secondary mt-1 max-w-xs">
            Crea la instancia compartida de Turnio en Evolution API para que los negocios puedan usarla.
          </p>
        </div>
        <Button onClick={handleSetup} loading={setupMutation.isPending}>
          Crear instancia compartida
        </Button>
      </div>
    );
  }

  // Connected
  if (status.connected) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-status-confirmed/40 bg-status-confirmed/5">
          <div className="w-10 h-10 rounded-xl bg-status-confirmed/15 flex items-center justify-center shrink-0">
            <Wifi className="w-5 h-5 text-status-confirmed" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary">Conectado</p>
            {status.phoneNumber && (
              <p className="text-sm text-text-secondary truncate">
                <Phone className="w-3 h-3 inline mr-1" />
                {status.phoneNumber}
              </p>
            )}
            {status.profileName && (
              <p className="text-xs text-text-secondary truncate">{status.profileName}</p>
            )}
          </div>
          <div className="w-2 h-2 rounded-full bg-status-confirmed animate-pulse shrink-0" />
        </div>

        <Button
          variant="secondary"
          onClick={handleDisconnect}
          loading={disconnectMutation.isPending}
          className="self-start text-status-cancelled hover:text-status-cancelled border-status-cancelled/30 hover:border-status-cancelled/60"
        >
          <WifiOff className="w-4 h-4" />
          Desconectar
        </Button>
      </div>
    );
  }

  // Configured but not connected
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface-elevated">
        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0">
          <WifiOff className="w-5 h-5 text-text-secondary" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">Instancia creada, sin vincular</p>
          <p className="text-xs text-text-secondary">{status.instanceName}</p>
        </div>
      </div>

      {view === 'phone-form' && (
        <div className="flex flex-col gap-3">
          <Input
            label="Número de teléfono de Turnio"
            placeholder="Ej: 573001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
          />
          <p className="text-xs text-text-secondary">
            Sin + ni espacios. Ejemplo: 573001234567 para Colombia.
          </p>
          <Button
            onClick={handleRequestCode}
            loading={pairingMutation.isPending}
            className="self-start"
          >
            Generar código de vinculación
          </Button>
        </div>
      )}

      {view === 'pairing' && pairing && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => { setView('phone-form'); stopPolling(); }}
            className="text-xs text-text-secondary hover:text-text-primary text-left transition-colors cursor-pointer"
          >
            ← Cambiar número
          </button>
          <WhatsAppPairingCode
            pairingCode={pairing.code}
            expiresAt={pairing.expiresAt}
            refreshing={pairingMutation.isPending}
            onRefresh={handleRefreshCode}
          />
        </div>
      )}
    </div>
  );
}
