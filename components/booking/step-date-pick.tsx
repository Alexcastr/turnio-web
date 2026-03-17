'use client';

import { useMemo } from 'react';
import { useBookingStore } from '@/lib/store/booking-store';
import { DateSelector } from './date-selector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Schedule } from '@/types/business';

interface StepDatePickProps {
  schedules: Schedule[];
}

export function StepDatePick({ schedules }: StepDatePickProps) {
  const { selectedDate, selectDate, goBack } = useBookingStore();

  const availableDays = useMemo(
    () => schedules.map((s) => s.dayOfWeek),
    [schedules],
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
            Selecciona una fecha
          </h2>
          <p className="text-sm text-text-secondary">
            Elige el día para tu cita
          </p>
        </div>
      </div>

      <DateSelector
        selectedDate={selectedDate}
        availableDays={availableDays}
        onSelect={selectDate}
      />
    </div>
  );
}
