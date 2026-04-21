'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { updateOwnerSchema, type UpdateOwnerData } from '@/lib/schemas/admin';
import { useUpdateOwner } from '@/lib/hooks/use-admin';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import { toast } from '@/components/admin/toast';
import type { OwnerItem } from '@/lib/api/admin';

function normalizePhone(p: string) {
  if (!p) return '';
  return p.startsWith('+') ? p : `+${p}`;
}

interface EditOwnerModalProps {
  owner: OwnerItem;
  onClose: () => void;
}

export function EditOwnerModal({ owner, onClose }: EditOwnerModalProps) {
  const { mutate, isPending } = useUpdateOwner();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateOwnerData>({
    resolver: zodResolver(updateOwnerSchema),
    defaultValues: {
      ownerName: owner.name,
      email: owner.email,
      businessName: owner.business?.name ?? '',
      category: owner.business?.category ?? '',
      phone: normalizePhone(owner.business?.phone ?? ''),
      timezone: '',
      isActive: owner.business?.isActive ?? true,
    },
  });

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function onSubmit(data: UpdateOwnerData) {
    // Strip empty optional strings so the backend ignores unchanged fields
    const payload: UpdateOwnerData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== '' && v !== undefined),
    ) as UpdateOwnerData;

    mutate(
      { userId: owner.id, data: payload },
      {
        onSuccess: () => {
          toast('success', 'Propietario actualizado correctamente');
          reset();
          onClose();
        },
        onError: (err) => {
          toast('error', err.message || 'Error al actualizar');
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-xl border border-border overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Editar propietario
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">{owner.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nombre del owner"
              {...register('ownerName')}
              error={errors.ownerName?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nombre del negocio"
              {...register('businessName')}
              error={errors.businessName?.message}
            />
            <Input
              label="Categoría"
              {...register('category')}
              error={errors.category?.message}
            />
          </div>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                label="Teléfono del negocio"
                error={errors.phone?.message}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
              />
            )}
          />

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-text-primary">
              Estado del negocio
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register('isActive')}
              />
              <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:duration-200 peer-checked:after:translate-x-5" />
            </label>
            <span className="text-xs text-text-secondary">
              {errors.isActive ? errors.isActive.message : 'Activo / Inactivo'}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" loading={isPending}>
              Guardar cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
