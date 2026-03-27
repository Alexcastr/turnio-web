import { Shield } from 'lucide-react';
import { PolicySection } from './policy-section';
import { CONTACT_EMAIL } from './constants';

export function PrivacySection() {
  return (
    <PolicySection
      id="privacidad"
      icon={Shield}
      title="Política de Privacidad"
      intro="TurnIO se compromete a proteger la privacidad de sus usuarios. Esta política describe qué datos recopilamos, cómo los usamos y los derechos que tienes sobre tu información."
      items={[
        {
          title: '1. Datos que recopilamos',
          content: (
            <ul className="space-y-2">
              <li><span className="font-medium text-text-primary">Información de cuenta</span> — nombre, correo electrónico y foto de perfil (al iniciar sesión con Google).</li>
              <li><span className="font-medium text-text-primary">Contacto</span> — número de teléfono (al agendar una cita).</li>
              <li><span className="font-medium text-text-primary">Citas</span> — servicio, profesional, fecha, hora y estado.</li>
              <li><span className="font-medium text-text-primary">Negocio</span> — nombre, categoría, servicios, horarios (para propietarios).</li>
              <li><span className="font-medium text-text-primary">Datos técnicos</span> — dirección IP, dispositivo y SO (para diagnóstico).</li>
            </ul>
          ),
        },
        {
          title: '2. Uso de tus datos',
          content: (
            <ul className="space-y-1.5">
              <li>Gestionar tu cuenta y autenticación.</li>
              <li>Permitirte agendar, modificar y cancelar citas.</li>
              <li>Enviar recordatorios vía WhatsApp (si vinculas tu número).</li>
              <li>Administrar tu negocio y agenda (si eres propietario).</li>
              <li>Mejorar el rendimiento, seguridad y experiencia.</li>
            </ul>
          ),
        },
        {
          title: '3. Compartición de datos',
          content: (
            <>
              <p className="mb-2"><span className="font-medium text-text-primary">No vendemos</span> tus datos personales.</p>
              <ul className="space-y-1.5">
                <li><span className="font-medium text-text-primary">Con el negocio</span> — al agendar, reciben tu nombre, teléfono y detalles de la cita.</li>
                <li><span className="font-medium text-text-primary">Proveedores</span> — Google (autenticación), WhatsApp vía WAHA (mensajería), hosting.</li>
                <li><span className="font-medium text-text-primary">Obligación legal</span> — si la ley lo requiere.</li>
              </ul>
            </>
          ),
        },
        {
          title: '4. Seguridad',
          content: (
            <p>Tus datos se almacenan en servidores seguros con cifrado en tránsito (HTTPS/TLS). Implementamos medidas razonables para proteger tu información contra acceso no autorizado.</p>
          ),
        },
        {
          title: '5. Tus derechos',
          content: (
            <>
              <p className="mb-2">Conforme a la Ley 1581 de 2012 (Colombia), tienes derecho a:</p>
              <ul className="mb-2 space-y-1.5">
                <li>Conocer, actualizar y rectificar tus datos personales.</li>
                <li>Solicitar la eliminación de tus datos.</li>
                <li>Revocar la autorización para el tratamiento de tus datos.</li>
                <li>Acceder de forma gratuita a tus datos.</li>
              </ul>
              <p>Escríbenos a <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
            </>
          ),
        },
        {
          title: '6. Menores de edad',
          content: (
            <p>TurnIO no está dirigido a menores de 13 años. No recopilamos intencionalmente datos de menores.</p>
          ),
        },
        {
          title: '7. Cambios a esta política',
          content: (
            <p>Podemos actualizar esta política periódicamente. Notificaremos cambios significativos a través de la app o por correo electrónico.</p>
          ),
        },
      ]}
    />
  );
}
