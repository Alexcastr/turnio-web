import { WhatsAppSharedPanel } from '@/components/admin/whatsapp-shared-panel';

export default function WhatsAppAdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          WhatsApp de Turnio
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Gestiona la instancia compartida de WhatsApp que los negocios pueden usar para enviar notificaciones sin conectar el suyo propio.
        </p>
      </div>

      <div className="max-w-lg border border-border rounded-xl p-6 bg-surface">
        <WhatsAppSharedPanel />
      </div>
    </div>
  );
}
