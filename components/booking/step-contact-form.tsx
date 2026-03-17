'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  appointmentFormSchema,
  type AppointmentFormValues,
} from '@/lib/schemas/appointment';
import { useBookingStore } from '@/lib/store/booking-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function StepContactForm() {
  const { contactInfo, setContactInfo, goBack } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: contactInfo ?? {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      notes: '',
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    setContactInfo(data);
  };

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
            Tus datos
          </h2>
          <p className="text-sm text-text-secondary">
            Ingresa tu información de contacto
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Nombre completo"
          placeholder="Tu nombre"
          error={errors.clientName?.message}
          {...register('clientName')}
        />

        <Input
          label="Teléfono"
          placeholder="+1 234 567 890"
          type="tel"
          error={errors.clientPhone?.message}
          {...register('clientPhone')}
        />

        <Input
          label="Correo electrónico (opcional)"
          placeholder="tu@email.com"
          type="email"
          error={errors.clientEmail?.message}
          {...register('clientEmail')}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-text-primary"
          >
            Notas (opcional)
          </label>
          <textarea
            id="notes"
            rows={3}
            placeholder="Algún detalle adicional..."
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            {...register('notes')}
          />
          {errors.notes?.message && (
            <p className="text-xs text-status-cancelled">
              {errors.notes.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="mt-2">
          Continuar
        </Button>
      </form>
    </div>
  );
}
