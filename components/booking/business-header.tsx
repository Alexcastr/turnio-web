import { Badge } from '@/components/ui/badge';
import { Phone } from 'lucide-react';
import type { Business } from '@/types/business';

interface BusinessHeaderProps {
  business: Business;
}

export function BusinessHeader({ business }: BusinessHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      {business.logoUrl ? (
        <img
          src={business.logoUrl}
          alt={business.name}
          className="h-14 w-14 rounded-2xl object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          <span className="text-xl font-bold text-primary-dark">
            {business.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex-1">
        <h1 className="text-lg font-bold text-text-primary">
          {business.name}
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="primary">{business.category}</Badge>
          <a
            href={`tel:${business.phone}`}
            className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-primary"
          >
            <Phone className="h-3 w-3" />
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
