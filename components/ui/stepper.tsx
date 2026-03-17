'use client';

import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';
import { BOOKING_STEPS } from '@/lib/constants';
import type { BookingStep } from '@/lib/store/booking-store';

interface StepperProps {
  currentStep: BookingStep;
}

const STEP_ORDER: BookingStep[] = ['service', 'staff', 'date', 'time', 'contact', 'confirm'];

export function Stepper({ currentStep }: StepperProps) {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between gap-1">
      {BOOKING_STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                isCompleted && 'bg-primary text-white',
                isActive && 'bg-primary text-white ring-4 ring-primary/20',
                !isCompleted && !isActive && 'bg-surface text-text-secondary border border-border',
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
            </div>
            <span
              className={cn(
                'text-xs',
                isActive ? 'text-primary font-medium' : 'text-text-secondary',
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
