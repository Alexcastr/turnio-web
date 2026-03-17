import { cn } from '@/lib/utils/cn';
import { Clock, DollarSign } from 'lucide-react';
import { formatDuration, formatPrice } from '@/lib/utils/format';
import type { Service } from '@/types/business';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, selected, onSelect }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={cn(
        'w-full rounded-2xl border p-4 text-left transition-all duration-150 cursor-pointer',
        selected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border bg-surface-elevated hover:border-primary/40',
      )}
    >
      <h3 className="font-semibold text-text-primary">{service.name}</h3>

      {service.description && (
        <p className="mt-1 text-sm text-text-secondary line-clamp-2">
          {service.description}
        </p>
      )}

      <div className="mt-3 flex items-center gap-4 text-sm text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {formatDuration(service.durationMinutes)}
        </span>
        <span className="inline-flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          {formatPrice(service.price, service.currency)}
        </span>
      </div>
    </button>
  );
}
