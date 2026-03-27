import type { Metadata } from 'next';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/landing/footer';
import { Shield, FileText, Trash2, Mail } from 'lucide-react';
import { PrivacySection } from '@/components/policies/privacy-section';
import { TermsSection } from '@/components/policies/terms-section';
import { DeletionSection } from '@/components/policies/deletion-section';
import { LAST_UPDATED, CONTACT_EMAIL } from '@/components/policies/constants';

export const metadata: Metadata = {
  title: 'TurnIO — Políticas de Privacidad y Términos',
  description:
    'Política de privacidad, términos de servicio y eliminación de datos de TurnIO.',
};

const NAV_ITEMS = [
  { href: '#privacidad', icon: Shield, label: 'Privacidad' },
  { href: '#terminos', icon: FileText, label: 'Términos' },
  { href: '#eliminacion', icon: Trash2, label: 'Eliminación' },
] as const;

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-2xl font-semibold text-text-primary sm:text-3xl">
            Políticas y Términos
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <nav className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl justify-center gap-8 px-4 py-3">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-primary"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 pt-16">
        <PrivacySection />
        <TermsSection />
        <DeletionSection />

        <section className="mb-16 rounded-xl border border-border bg-surface/50 p-8 text-center">
          <Mail className="mx-auto mb-3 h-6 w-6 text-primary" />
          <p className="text-sm text-text-secondary">
            ¿Preguntas? Escríbenos a{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
