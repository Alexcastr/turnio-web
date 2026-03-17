'use client';

import { cn } from '@/lib/utils/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'rounded-xl border border-border bg-surface px-4 py-2.5 text-sm',
            'text-text-primary placeholder:text-text-secondary',
            'outline-none transition-colors duration-150',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            error && 'border-status-cancelled',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-status-cancelled">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
