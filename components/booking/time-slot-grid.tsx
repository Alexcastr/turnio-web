import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/format';
import type { TimeSlot } from '@/types/availability';

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotGrid({
  slots,
  selectedTime,
  onSelect,
}: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-secondary">
        No hay horarios disponibles para esta fecha.
      </p>
    );
  }

  const availableCount = slots.filter((s) => s.status === 'available').length;

  return (
    <div>
      <div className="mb-3 flex items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary/20 border border-primary/40" />
          Disponible ({availableCount})
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-surface border border-border" />
          Ocupado
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const display = formatTime(slot.time);
          const isSelected = selectedTime === slot.time;
          const isOccupied = slot.status === 'occupied';

          return (
            <button
              key={slot.time}
              type="button"
              disabled={isOccupied}
              onClick={() => onSelect(slot.time)}
              className={cn(
                'rounded-xl border py-2.5 text-sm font-medium transition-colors',
                isOccupied &&
                  'border-border bg-surface text-text-secondary/40 line-through cursor-not-allowed',
                !isOccupied &&
                  !isSelected &&
                  'border-border bg-surface-elevated text-text-primary hover:border-primary/40 cursor-pointer',
                isSelected &&
                  'border-primary bg-primary text-white cursor-pointer',
              )}
            >
              {display}
            </button>
          );
        })}
      </div>
    </div>
  );
}
