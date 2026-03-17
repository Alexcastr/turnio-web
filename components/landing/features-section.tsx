import { Search, CalendarDays, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Busca tu negocio',
    description: 'Ingresa el nombre de tu negocio favorito para ver sus servicios disponibles.',
  },
  {
    icon: CalendarDays,
    title: 'Elige fecha y hora',
    description: 'Selecciona el servicio, la fecha y el horario que mejor se adapte a ti.',
  },
  {
    icon: CheckCircle,
    title: 'Confirma tu cita',
    description: 'Completa tus datos y listo. Recibirás la confirmación al instante.',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-2 text-center text-2xl font-bold text-text-primary">
          ¿Cómo funciona?
        </h2>
        <p className="mb-10 text-center text-text-secondary">
          Tres pasos simples para agendar tu cita
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl bg-surface-elevated p-6 text-center border border-border"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
