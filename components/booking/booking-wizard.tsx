'use client';

import { useCallback, useEffect } from 'react';
import { useBookingStore } from '@/lib/store/booking-store';
import type { BookingStep } from '@/lib/store/booking-store';
import { Stepper } from '@/components/ui/stepper';
import { StepServiceSelect } from './step-service-select';
import { StepStaffSelect } from './step-staff-select';
import { StepDatePick } from './step-date-pick';
import { StepTimePick } from './step-time-pick';
import { StepContactForm } from './step-contact-form';
import { StepConfirmation } from './step-confirmation';
import { BookingSuccess } from './booking-success';
import type { Business } from '@/types/business';

interface BookingWizardProps {
  slug: string;
  business: Business;
}

export function BookingWizard({ slug, business }: BookingWizardProps) {
  const { currentStep, reset, selectStaff, setStep } = useBookingStore();

  useEffect(() => {
    reset();
  }, [slug, reset]);

  // Auto-skip staff step if there's only 1 worker or empty
  useEffect(() => {
    if (currentStep === 'staff') {
      if (!business.staff || business.staff.length <= 1) {
        selectStaff(business.staff?.[0] || null);
      }
    }
  }, [currentStep, business.staff, selectStaff]);

  const handleStepClick = useCallback(
    (step: BookingStep) => {
      setStep(step);
    },
    [setStep],
  );

  if (currentStep === 'success') {
    return <BookingSuccess />;
  }

  return (
    <div>
      <div className="mb-6">
        <Stepper currentStep={currentStep} onStepClick={handleStepClick} />
      </div>

      {currentStep === 'service' && (
        <StepServiceSelect services={business.services} />
      )}
      {currentStep === 'staff' && (
        <StepStaffSelect staff={business.staff} />
      )}
      {currentStep === 'date' && (
        <StepDatePick schedules={business.schedules} />
      )}
      {currentStep === 'time' && <StepTimePick slug={slug} />}
      {currentStep === 'contact' && <StepContactForm />}
      {currentStep === 'confirm' && <StepConfirmation slug={slug} timezone={business.timezone} />}
    </div>
  );
}
