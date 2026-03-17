'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-surface hover:text-text-primary cursor-pointer"
      aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
