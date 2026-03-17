import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/badge';
import type { BusinessListItem } from '@/types/business';

interface BusinessCardProps {
  business: BusinessListItem;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/${business.slug}`}
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-border bg-surface-elevated p-4',
        'transition-all duration-150 hover:border-primary/40 hover:shadow-md',
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
        {business.logoUrl ? (
          <img
            src={business.logoUrl}
            alt={business.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span className="text-lg font-bold text-primary">
            {business.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-text-primary">
          {business.name}
        </p>
        {business.category && (
          <Badge variant="default" className="mt-1">
            {business.category}
          </Badge>
        )}
      </div>
    </Link>
  );
}
