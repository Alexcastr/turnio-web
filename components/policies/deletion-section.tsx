import { Trash2 } from 'lucide-react';
import { PolicySection } from './policy-section';
import { CONTACT_EMAIL } from './constants';

export function DeletionSection() {
  return (
    <PolicySection
      id="eliminacion"
      icon={Trash2}
      title="Eliminación de Datos y Cuenta"
      intro="Respetamos tu derecho a controlar tus datos personales. Puedes solicitar la eliminación completa de tu cuenta y datos en cualquier momento."
      items={[
        {
          title: 'Cómo solicitar la eliminación',
          content: (
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <p className="mb-3">
                Envía un correo a{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Solicitud de eliminación de cuenta - TurnIO`}
                  className="font-medium text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                con el asunto &quot;Solicitud de eliminación de cuenta&quot; e incluye:
              </p>
              <ul className="space-y-1.5">
                <li>Tu nombre completo.</li>
                <li>El correo electrónico asociado a tu cuenta.</li>
                <li>Motivo de la solicitud (opcional).</li>
              </ul>
            </div>
          ),
        },
        {
          title: 'Datos que se eliminan',
          content: (
            <ul className="space-y-1.5">
              <li>Información de cuenta (nombre, email, foto de perfil).</li>
              <li>Historial de citas.</li>
              <li>Datos de negocio, servicios y configuración (si eres propietario).</li>
              <li>Número de teléfono y preferencias de notificación.</li>
            </ul>
          ),
        },
        {
          title: 'Plazo',
          content: (
            <p>Tu solicitud será procesada dentro de <span className="font-medium text-text-primary">15 días hábiles</span>, conforme a la Ley 1581 de 2012. Recibirás confirmación por correo.</p>
          ),
        },
        {
          title: 'Datos que podemos retener',
          content: (
            <p>Por obligaciones legales, podemos retener información anonimizada o agregada (registros contables). Esta información no permite identificarte.</p>
          ),
        },
      ]}
    />
  );
}
