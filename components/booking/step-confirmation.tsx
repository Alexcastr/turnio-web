'use client';

import { useBookingStore } from '@/lib/store/booking-store';
import { useCreateAppointment } from '@/lib/hooks/use-create-appointment';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { formatDate, formatTime, formatDuration, formatPrice, toISOWithTimezone } from '@/lib/utils/format';

interface StepConfirmationProps {
  slug: string;
  timezone: string;
}

export function StepConfirmation({ slug, timezone }: StepConfirmationProps) {
  const {
    selectedService,
    selectedStaff,
    selectedDate,
    selectedTime,
    contactInfo,
    goBack,
    setStep,
  } = useBookingStore();

  const mutation = useCreateAppointment(slug);

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime || !contactInfo) return;

    const startAt = toISOWithTimezone(selectedDate, selectedTime, timezone);

    mutation.mutate(
      {
        clientName: contactInfo.clientName,
        clientPhone: contactInfo.clientPhone,
        clientEmail: contactInfo.clientEmail || undefined,
        serviceId: selectedService.id,
        staffId: selectedStaff?.id || undefined,
        startAt,
        notes: contactInfo.notes || undefined,
      },
      { onSuccess: () => setStep('success') },
    );
  };

  if (!selectedService || !selectedDate || !selectedTime || !contactInfo) {
    return null;
  }

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
            Confirmar cita
          </h2>
          <p className="text-sm text-text-secondary">
            Revisa los detalles antes de confirmar
          </p>
        </div>
      </div>

      <Card className="mb-4">
        <div className="space-y-3 text-sm">
          <Row label="Servicio" value={selectedService.name} />
          <Row
            label="Duración"
            value={formatDuration(selectedService.durationMinutes)}
          />
          <Row
            label="Precio"
            value={formatPrice(selectedService.price, selectedService.currency)}
          />
          {selectedStaff && (
            <Row label="Profesional" value={selectedStaff.displayName || selectedStaff.name} />
          )}
          <div className="border-t border-border" />
          <Row label="Fecha" value={formatDate(selectedDate)} />
          <Row label="Hora" value={formatTime(selectedTime)} />
          <div className="border-t border-border" />
          <Row label="Nombre" value={contactInfo.clientName} />
          <Row label="Teléfono" value={contactInfo.clientPhone} />
          {contactInfo.clientEmail && (
            <Row label="Email" value={contactInfo.clientEmail} />
          )}
          {contactInfo.notes && (
            <Row label="Notas" value={contactInfo.notes} />
          )}
        </div>
      </Card>

      {mutation.isError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-status-cancelled/10 p-4 text-sm text-status-cancelled">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Error al agendar la cita. Intenta de nuevo.
        </div>
      )}

      <Button
        onClick={handleConfirm}
        loading={mutation.isPending}
        size="lg"
        className="w-full"
      >
        Confirmar Cita
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary capitalize">{value}</span>
    </div>
  );
}
