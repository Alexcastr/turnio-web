'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignUserSchema, type AssignUserData } from '@/lib/schemas/admin';
import { useAssignUser } from '@/lib/hooks/use-admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/admin/toast';

export default function AssignUserPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignUserData>({
    resolver: zodResolver(assignUserSchema),
    defaultValues: {
      userId: '',
      businessId: '',
      role: 'STAFF',
    },
  });

  const { mutate, isPending } = useAssignUser();

  function onSubmit(data: AssignUserData) {
    mutate(data, {
      onSuccess: () => {
        toast('success', 'Usuario asignado exitosamente');
        reset();
      },
      onError: (error) => {
        toast('error', error.message || 'Error al asignar usuario');
      },
    });
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text-primary">
          Asignar Usuario
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Asigna un usuario existente a un negocio con un rol específico.
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="ID del usuario"
            {...register('userId')}
            error={errors.userId?.message}
            placeholder="ID del usuario"
          />
          <Input
            label="ID del negocio"
            {...register('businessId')}
            error={errors.businessId?.message}
            placeholder="ID del negocio"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-primary">
              Rol
            </label>
            <select
              {...register('role')}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="STAFF">Staff</option>
              <option value="OWNER">Owner</option>
            </select>
            {errors.role && (
              <p className="text-xs text-status-cancelled">
                {errors.role.message}
              </p>
            )}
          </div>

          <Button type="submit" loading={isPending} className="w-full mt-2">
            Asignar usuario
          </Button>
        </form>
      </Card>
    </div>
  );
}
