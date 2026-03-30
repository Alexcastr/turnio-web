'use client';

import { Check, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const CONTACT_EMAIL = 'castro.t.alex@gmail.com';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary-dark">
            ¿Quieres unirte?
          </span>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-text-primary">
          Registra tu negocio en TurnIO
        </h2>
        <p className="mx-auto mb-8 max-w-md text-text-secondary">
          Si eres dueño de un negocio y quieres ofrecer reservas en línea a
          tus clientes, escríbenos y te daremos acceso a la plataforma.
        </p>

        <div className="inline-flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-5 py-3">
            <span className="text-sm font-medium text-text-primary select-all">
              {CONTACT_EMAIL}
            </span>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-text-secondary">
            Escríbenos a este correo y te daremos acceso lo antes posible.
          </p>
        </div>
      </div>
    </section>
  );
}
