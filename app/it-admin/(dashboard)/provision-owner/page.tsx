'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  provisionOwnerSchema,
  type ProvisionOwnerData,
} from '@/lib/schemas/admin';
import { useProvisionOwner } from '@/lib/hooks/use-admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { CollapsibleSection } from '@/components/admin/collapsible-section';
import { ScheduleFields } from '@/components/admin/schedule-fields';
import { ServiceFields } from '@/components/admin/service-fields';
import { toast } from '@/components/admin/toast';

const DEFAULT_SCHEDULES = [
  { dayOfWeek: '0', startTime: '00:00', endTime: '00:00', isOpen: false },
  { dayOfWeek: '1', startTime: '08:00', endTime: '18:00', isOpen: true },
  { dayOfWeek: '2', startTime: '08:00', endTime: '18:00', isOpen: true },
  { dayOfWeek: '3', startTime: '08:00', endTime: '18:00', isOpen: true },
  { dayOfWeek: '4', startTime: '08:00', endTime: '18:00', isOpen: true },
  { dayOfWeek: '5', startTime: '08:00', endTime: '18:00', isOpen: true },
  { dayOfWeek: '6', startTime: '09:00', endTime: '14:00', isOpen: true },
];

const DEFAULT_SERVICE = {
  name: '',
  durationMin: 30,
  price: undefined as number | undefined,
  color: '#10B981',
};

export default function ProvisionOwnerPage() {
  const methods = useForm<ProvisionOwnerData>({
    resolver: zodResolver(provisionOwnerSchema),
    defaultValues: {
      email: '',
      password: '',
      ownerName: '',
      businessName: '',
      category: '',
      phone: '',
      timezone: 'America/Bogota',
      schedules: DEFAULT_SCHEDULES,
      services: [{ ...DEFAULT_SERVICE }],
    },
  });

  const { mutate, isPending } = useProvisionOwner();

  function onSubmit(data: ProvisionOwnerData) {
    mutate(data, {
      onSuccess: () => {
        toast('success', 'Propietario y negocio creados exitosamente');
        methods.reset();
      },
      onError: (error) => {
        toast('error', error.message || 'Error al crear propietario');
      },
    });
  }

  const {
    register,
    control,
    formState: { errors },
  } = methods;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          Crear Propietario
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Crea una cuenta de propietario con su negocio, horarios y servicios.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CollapsibleSection title="Datos del propietario">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                {...register('ownerName')}
                error={errors.ownerName?.message}
                placeholder="Nombre completo"
              />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                placeholder="correo@ejemplo.com"
              />
              <Input
                label="Contraseña"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                placeholder="Mínimo 8 caracteres"
                className="sm:col-span-2"
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Datos del negocio">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre del negocio"
                {...register('businessName')}
                error={errors.businessName?.message}
                placeholder="Ej: Barbería Los Reyes"
              />
              <Input
                label="Categoría"
                {...register('category')}
                error={errors.category?.message}
                placeholder="Ej: Barbería"
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    label="Teléfono"
                    error={errors.phone?.message}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                )}
              />
              <Input
                label="Zona horaria"
                {...register('timezone')}
                placeholder="America/Bogota"
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Horarios">
            <ScheduleFields />
          </CollapsibleSection>

          <CollapsibleSection title="Servicios">
            <ServiceFields />
          </CollapsibleSection>

          <div className="flex justify-end pt-2">
            <Button type="submit" loading={isPending} size="lg">
              Crear propietario y negocio
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
