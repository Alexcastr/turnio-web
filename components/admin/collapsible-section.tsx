'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-surface-elevated transition-colors duration-150 cursor-pointer"
      >
        <span className="text-sm font-semibold text-text-primary">
          {title}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-text-secondary transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && <div className="p-4 border-t border-border">{children}</div>}
    </div>
  );
}
