'use client';

import { useBookingStore } from '@/lib/store/booking-store';
import { Button } from '@/components/ui/button';
import { CheckCircle, CalendarPlus } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils/format';

export function BookingSuccess() {
  const { selectedService, selectedDate, selectedTime, reset } =
    useBookingStore();

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <CheckCircle className="h-8 w-8 text-primary" />
      </div>

      <h2 className="mb-2 text-xl font-bold text-text-primary">
        ¡Cita agendada!
      </h2>
      <p className="mb-6 text-sm text-text-secondary">
        Tu cita ha sido confirmada exitosamente
      </p>

      {selectedService && selectedDate && selectedTime && (
        <div className="mb-6 w-full rounded-2xl border border-border bg-surface p-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Servicio</span>
              <span className="font-medium text-text-primary">
                {selectedService.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Fecha</span>
              <span className="font-medium text-text-primary capitalize">
                {formatDate(selectedDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Hora</span>
              <span className="font-medium text-text-primary">
                {formatTime(selectedTime)}
              </span>
            </div>
          </div>
        </div>
      )}

      <Button onClick={reset} variant="secondary" size="lg">
        <CalendarPlus className="h-4 w-4" />
        Agendar otra cita
      </Button>
    </div>
  );
}
