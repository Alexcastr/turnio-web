import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm text-text-secondary">
          Powered by{' '}
          <span className="font-semibold text-primary">TurnIO</span>
        </p>
        <Link
          href="/policies"
          className="mt-2 inline-block text-xs text-text-secondary hover:text-primary"
        >
          Políticas de Privacidad y Términos
        </Link>
      </div>
    </footer>
  );
}
