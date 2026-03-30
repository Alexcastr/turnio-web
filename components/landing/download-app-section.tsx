import { Smartphone, ExternalLink } from 'lucide-react';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.turnio.app';

export function DownloadAppSection() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-border bg-surface-elevated p-8 sm:p-10">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-8">
            <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 sm:mb-0">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>

            <div className="flex-1">
              <h2 className="mb-2 text-xl font-bold text-text-primary">
                ¿Tienes un negocio? Gestiona tus citas desde tu celular
              </h2>
              <p className="mb-6 text-sm text-text-secondary">
                Descarga la app de TurnIO para Android y administra tus
                reservas, servicios y horarios desde cualquier lugar.
              </p>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Descargar en Google Play
                <ExternalLink className="h-4 w-4" />
              </a>

              <p className="mt-4 text-xs text-text-secondary">
                Disponible para Android. La app se encuentra actualmente en
                fase de pruebas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
