'use client';

import { useBookingStore } from '@/lib/store/booking-store';
import { useAvailability } from '@/lib/hooks/use-availability';
import { TimeSlotGrid } from './time-slot-grid';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface StepTimePickProps {
  slug: string;
}

export function StepTimePick({ slug }: StepTimePickProps) {
  const {
    selectedService,
    selectedStaff,
    selectedDate,
    selectedTime,
    selectTime,
    goBack,
  } = useBookingStore();

  const { data, isLoading, isError } = useAvailability(
    slug,
    selectedDate,
    selectedService?.id ?? null,
    selectedStaff?.id ?? null,
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={goBack}
          className="rounded-lg p-1.5 hover:bg-surface text-text-secondary cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Selecciona una hora
          </h2>
          <p className="text-sm text-text-secondary">
            Horarios disponibles para {selectedDate}
            {selectedStaff && ` con ${selectedStaff.displayName || selectedStaff.name}`}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-2 rounded-xl bg-status-cancelled/10 p-4 text-sm text-status-cancelled">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Error al cargar los horarios. Intenta de nuevo.
        </div>
      )}

      {data && (
        <TimeSlotGrid
          slots={data.slots}
          selectedTime={selectedTime}
          onSelect={selectTime}
        />
      )}
    </div>
  );
}
