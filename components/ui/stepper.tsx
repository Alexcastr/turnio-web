'use client';

import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';
import { BOOKING_STEPS } from '@/lib/constants';
import type { BookingStep } from '@/lib/store/booking-store';

interface StepperProps {
  currentStep: BookingStep;
  onStepClick?: (step: BookingStep) => void;
}

const STEP_ORDER: BookingStep[] = ['service', 'staff', 'date', 'time', 'contact', 'confirm'];

export function Stepper({ currentStep, onStepClick }: StepperProps) {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between gap-1">
      {BOOKING_STEPS.map((step, idx) => {
        const isCompleted = idx < currentIdx;
        const isActive = step.id === currentStep;
        const isClickable = isCompleted && !!onStepClick;

        return (
          <button
            key={step.id}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick(step.id as BookingStep)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 bg-transparent border-0 p-0',
              isClickable && 'cursor-pointer group',
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                isCompleted && 'bg-primary text-white',
                isClickable && 'group-hover:ring-4 group-hover:ring-primary/20',
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
                isClickable && 'group-hover:text-primary',
              )}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
