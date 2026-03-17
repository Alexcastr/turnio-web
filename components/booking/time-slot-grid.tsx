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
  const availableSlots = slots.filter((s) => s.available);

  if (availableSlots.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-secondary">
        No hay horarios disponibles para esta fecha.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {availableSlots.map((slot) => {
        const display = formatTime(slot.startTime);
        const isSelected = selectedTime === slot.startTime;

        return (
          <button
            key={slot.startTime}
            type="button"
            onClick={() => onSelect(slot.startTime)}
            className={cn(
              'rounded-xl border py-2.5 text-sm font-medium transition-colors cursor-pointer',
              isSelected
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-surface-elevated text-text-primary hover:border-primary/40',
            )}
          >
            {display}
          </button>
        );
      })}
    </div>
  );
}
