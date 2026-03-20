'use client';

import { useFormContext } from 'react-hook-form';

const DAYS = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Lunes' },
  { value: '2', label: 'Martes' },
  { value: '3', label: 'Miércoles' },
  { value: '4', label: 'Jueves' },
  { value: '5', label: 'Viernes' },
  { value: '6', label: 'Sábado' },
];

export function ScheduleFields() {
  const { register, watch, setValue } = useFormContext();
  const schedules = watch('schedules');

  return (
    <div className="flex flex-col gap-3">
      {DAYS.map((day, index) => {
        const isOpen = schedules?.[index]?.isOpen ?? false;
        return (
          <div
            key={day.value}
            className="flex items-center gap-3 flex-wrap sm:flex-nowrap"
          >
            <label className="w-24 text-sm font-medium text-text-primary shrink-0">
              {day.label}
            </label>
            <button
              type="button"
              onClick={() => setValue(`schedules.${index}.isOpen`, !isOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                isOpen
                  ? 'bg-primary/10 text-primary'
                  : 'bg-surface text-text-secondary border border-border'
              }`}
            >
              {isOpen ? 'Abierto' : 'Cerrado'}
            </button>
            {isOpen && (
              <>
                <input
                  type="time"
                  {...register(`schedules.${index}.startTime`)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary"
                />
                <span className="text-text-secondary text-sm">a</span>
                <input
                  type="time"
                  {...register(`schedules.${index}.endTime`)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary"
                />
              </>
            )}
            <input
              type="hidden"
              {...register(`schedules.${index}.dayOfWeek`)}
            />
          </div>
        );
      })}
    </div>
  );
}
