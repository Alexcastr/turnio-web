'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface DateSelectorProps {
  selectedDate: string | null;
  availableDays: number[];
  onSelect: (date: string) => void;
}

const WEEKDAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export function DateSelector({
  selectedDate,
  availableDays,
  onSelect,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);

    const result: Date[] = [];
    let day = calStart;
    while (isBefore(day, addDays(calEnd, 1))) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  const isDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    if (!isSameMonth(date, currentMonth)) return true;
    return !availableDays.includes(date.getDay());
  };

  const handleSelect = (date: Date) => {
    if (!isDisabled(date)) {
      onSelect(format(date, 'yyyy-MM-dd'));
    }
  };

  const selected = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className="rounded-lg p-2 hover:bg-surface text-text-secondary cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold capitalize text-text-primary">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-2 hover:bg-surface text-text-secondary cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-2 text-center text-xs font-medium text-text-secondary"
          >
            {label}
          </div>
        ))}

        {days.map((date, i) => {
          const disabled = isDisabled(date);
          const isSelected = selected && isSameDay(date, selected);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(date)}
              className={cn(
                'aspect-square rounded-xl text-sm transition-colors cursor-pointer',
                disabled && 'text-text-secondary/30 cursor-not-allowed',
                !disabled && !isSelected && 'hover:bg-primary-light text-text-primary',
                isSelected && 'bg-primary text-white font-semibold',
                isToday && !isSelected && 'ring-1 ring-primary',
              )}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
