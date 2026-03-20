'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

let addToastFn: ((type: ToastType, message: string) => void) | null = null;

export function toast(type: ToastType, message: string) {
  addToastFn?.(type, message);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (type, message) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-start gap-3 p-4 rounded-xl border shadow-lg bg-surface-elevated',
            t.type === 'success' && 'border-status-confirmed',
            t.type === 'error' && 'border-status-cancelled',
          )}
        >
          {t.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-status-confirmed shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-status-cancelled shrink-0 mt-0.5" />
          )}
          <p className="text-sm text-text-primary flex-1">{t.message}</p>
          <button
            onClick={() => dismiss(t.id)}
            className="text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
