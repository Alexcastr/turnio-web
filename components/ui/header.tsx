import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="border-b border-border bg-surface-elevated">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-text-primary">TurnIO</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
