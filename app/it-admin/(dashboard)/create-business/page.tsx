'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createBusinessSchema,
  type CreateBusinessData,
} from '@/lib/schemas/admin';
import { useCreateBusiness } from '@/lib/hooks/use-admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

export default function CreateBusinessPage() {
  const methods = useForm<CreateBusinessData>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      userId: '',
      name: '',
      category: '',
      phone: '',
      timezone: 'America/Bogota',
      schedules: DEFAULT_SCHEDULES,
      services: [{ ...DEFAULT_SERVICE }],
    },
  });

  const { mutate, isPending } = useCreateBusiness();

  function onSubmit(data: CreateBusinessData) {
    mutate(data, {
      onSuccess: () => {
        toast('success', 'Negocio creado exitosamente');
        methods.reset();
      },
      onError: (error) => {
        toast('error', error.message || 'Error al crear negocio');
      },
    });
  }

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          Crear Negocio
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Crea un negocio para un usuario existente que no tenga uno asignado.
        </p>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CollapsibleSection title="Usuario">
            <Input
              label="ID del usuario"
              {...register('userId')}
              error={errors.userId?.message}
              placeholder="ID del usuario existente"
            />
          </CollapsibleSection>

          <CollapsibleSection title="Datos del negocio">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre del negocio"
                {...register('name')}
                error={errors.name?.message}
                placeholder="Ej: Barbería Los Reyes"
              />
              <Input
                label="Categoría"
                {...register('category')}
                error={errors.category?.message}
                placeholder="Ej: Barbería"
              />
              <Input
                label="Teléfono"
                {...register('phone')}
                error={errors.phone?.message}
                placeholder="+573001112233"
              />
              <Input
                label="Zona horaria"
                {...register('timezone')}
                placeholder="America/Bogota"
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Horarios" defaultOpen={false}>
            <ScheduleFields />
          </CollapsibleSection>

          <CollapsibleSection title="Servicios" defaultOpen={false}>
            <ServiceFields />
          </CollapsibleSection>

          <div className="flex justify-end pt-2">
            <Button type="submit" loading={isPending} size="lg">
              Crear negocio
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
