'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const COLOR_OPTIONS = [
  '#10B981',
  '#3B82F6',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#F97316',
];

export function ServiceFields() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => {
        const serviceErrors = (errors.services as Record<string, Record<string, { message?: string }>> | undefined)?.[index];
        const selectedColor = watch(`services.${index}.color`);

        return (
          <div
            key={field.id}
            className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-surface"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-text-secondary">
                Servicio {index + 1}
              </span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-text-secondary hover:text-status-cancelled transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Nombre"
                {...register(`services.${index}.name`)}
                error={serviceErrors?.name?.message}
                placeholder="Ej: Corte clásico"
              />
              <Input
                label="Duración (min)"
                type="number"
                {...register(`services.${index}.durationMin`, { valueAsNumber: true })}
                error={serviceErrors?.durationMin?.message}
                placeholder="30"
              />
              <Input
                label="Precio"
                type="number"
                {...register(`services.${index}.price`, { valueAsNumber: true })}
                error={serviceErrors?.price?.message}
                placeholder="Ej: 15000"
              />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-text-primary">
                  Color
                </span>
                <div className="flex gap-2 flex-wrap">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setValue(`services.${index}.color`, color)
                      }
                      className={`w-7 h-7 rounded-full cursor-pointer transition-all ${
                        selectedColor === color
                          ? 'ring-2 ring-offset-2 ring-primary scale-110'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() =>
          append({
            name: '',
            durationMin: 30,
            price: 0,
            color: '#10B981',
          })
        }
        className="self-start"
      >
        <Plus className="w-4 h-4" />
        Agregar servicio
      </Button>
    </div>
  );
}
