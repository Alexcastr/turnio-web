import { FileText } from 'lucide-react';
import { PolicySection } from './policy-section';

export function TermsSection() {
  return (
    <PolicySection
      id="terminos"
      icon={FileText}
      title="Términos de Servicio"
      intro="Al usar TurnIO aceptas los siguientes términos y condiciones."
      items={[
        {
          title: '1. Descripción del servicio',
          content: (
            <p>TurnIO es una plataforma de agendamiento en línea que permite reservar citas con negocios registrados. Los propietarios pueden gestionar su agenda, servicios, personal y recibir notificaciones vía WhatsApp.</p>
          ),
        },
        {
          title: '2. Registro y cuenta',
          content: (
            <ul className="space-y-1.5">
              <li>Para acceder como propietario debes iniciar sesión con Google.</li>
              <li>Eres responsable de la seguridad de tu cuenta.</li>
              <li>Los clientes pueden agendar citas sin crear cuenta, proporcionando nombre y teléfono.</li>
            </ul>
          ),
        },
        {
          title: '3. Uso aceptable',
          content: (
            <ul className="space-y-1.5">
              <li>Proporcionar información veraz y actualizada.</li>
              <li>No usar la plataforma para actividades ilegales.</li>
              <li>No intentar acceder a datos de otros usuarios sin autorización.</li>
              <li>No interferir con el funcionamiento de la plataforma.</li>
            </ul>
          ),
        },
        {
          title: '4. Citas y cancelaciones',
          content: (
            <ul className="space-y-1.5">
              <li>Las citas están sujetas a disponibilidad del negocio y profesional.</li>
              <li>Los negocios pueden cancelar o reprogramar según sus políticas.</li>
              <li>TurnIO no es responsable por incumplimientos del negocio o cliente.</li>
            </ul>
          ),
        },
        {
          title: '5. Propiedad intelectual',
          content: (
            <p>Todo el contenido, diseño, código y marca de TurnIO son propiedad de sus creadores. No está permitido copiar, modificar o distribuir ningún elemento sin autorización.</p>
          ),
        },
        {
          title: '6. Integración con WhatsApp (servicio no oficial)',
          content: (
            <>
              <p className="mb-2">
                TurnIO utiliza la función de <span className="font-medium text-text-primary">Dispositivos Vinculados</span> de WhatsApp para enviar recordatorios de citas.
                Esta integración <span className="font-medium text-text-primary">no es la API oficial en la nube de Meta (WhatsApp Business API)</span>.
              </p>
              <ul className="space-y-1.5">
                <li><span className="font-medium text-text-primary">Riesgo de bloqueo:</span> Meta puede suspender o bloquear permanentemente un número que viole sus términos de uso — incluyendo cuentas que reciban reportes de spam, envíen mensajes excesivos o usen números recién adquiridos. TurnIO no tiene control sobre estas decisiones.</li>
                <li><span className="font-medium text-text-primary">Sin responsabilidad por baneos:</span> TurnIO no se hace responsable por la suspensión, bloqueo o pérdida del número de WhatsApp del propietario derivada del uso del servicio o de reportes de spam por parte de sus clientes.</li>
                <li><span className="font-medium text-text-primary">Continuidad del servicio:</span> Las conexiones por Dispositivos Vinculados pueden desconectarse si WhatsApp realiza actualizaciones en su plataforma. Esto puede requerir reconexión manual y no constituye un fallo imputable a TurnIO.</li>
                <li><span className="font-medium text-text-primary">Recomendación:</span> Se aconseja usar una cuenta de <span className="font-medium text-text-primary">WhatsApp Business</span> con un número con historial de uso regular, y mantener el teléfono conectado a internet.</li>
                <li><span className="font-medium text-text-primary">Responsabilidad del propietario:</span> Al vincular su número, el propietario acepta usar el servicio de forma responsable y asumir los riesgos derivados del uso de una integración no oficial.</li>
              </ul>
            </>
          ),
        },
        {
          title: '7. Limitación de responsabilidad',
          content: (
            <p>TurnIO se proporciona &quot;tal cual&quot;. No garantizamos disponibilidad ininterrumpida. No somos responsables por daños derivados del uso de la plataforma.</p>
          ),
        },
        {
          title: '8. Terminación',
          content: (
            <p>Nos reservamos el derecho de suspender cuentas que violen estos términos. Puedes dejar de usar TurnIO y solicitar la eliminación de tu cuenta en cualquier momento.</p>
          ),
        },
        {
          title: '9. Legislación aplicable',
          content: (
            <p>Estos términos se rigen por las leyes de la República de Colombia.</p>
          ),
        },
      ]}
    />
  );
}
