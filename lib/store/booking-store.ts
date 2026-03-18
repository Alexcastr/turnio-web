import { create } from 'zustand';
import type { Service, StaffWorker } from '@/types/business';
import type { AppointmentFormValues } from '@/lib/schemas/appointment';

export type BookingStep =
  | 'service'
  | 'staff'
  | 'date'
  | 'time'
  | 'contact'
  | 'confirm'
  | 'success';

interface BookingState {
  currentStep: BookingStep;
  selectedService: Service | null;
  selectedStaff: StaffWorker | null;
  selectedDate: string | null;
  selectedTime: string | null;
  contactInfo: AppointmentFormValues | null;

  setStep: (step: BookingStep) => void;
  selectService: (service: Service) => void;
  selectStaff: (staff: StaffWorker | null) => void;
  selectDate: (date: string) => void;
  selectTime: (time: string) => void;
  setContactInfo: (info: AppointmentFormValues) => void;
  goBack: () => void;
  reset: () => void;
}

const STEP_ORDER: BookingStep[] = [
  'service',
  'staff',
  'date',
  'time',
  'contact',
  'confirm',
];

export const useBookingStore = create<BookingState>((set, get) => ({
  currentStep: 'service',
  selectedService: null,
  selectedStaff: null,
  selectedDate: null,
  selectedTime: null,
  contactInfo: null,

  setStep: (step) => {
    const targetIdx = STEP_ORDER.indexOf(step);
    const currentIdx = STEP_ORDER.indexOf(get().currentStep);

    // When navigating backwards, clear downstream selections
    if (targetIdx < currentIdx) {
      const clearFrom: Partial<BookingState> = { currentStep: step };
      if (targetIdx <= STEP_ORDER.indexOf('staff')) clearFrom.selectedDate = null;
      if (targetIdx <= STEP_ORDER.indexOf('date')) clearFrom.selectedTime = null;
      if (targetIdx <= STEP_ORDER.indexOf('time')) clearFrom.contactInfo = null;
      set(clearFrom);
    } else {
      set({ currentStep: step });
    }
  },

  selectService: (service) =>
    set({ selectedService: service, currentStep: 'staff' }),

  selectStaff: (staff) =>
    set({ selectedStaff: staff, currentStep: 'date' }),

  selectDate: (date) => set({ selectedDate: date, currentStep: 'time' }),

  selectTime: (time) => set({ selectedTime: time, currentStep: 'contact' }),

  setContactInfo: (info) =>
    set({ contactInfo: info, currentStep: 'confirm' }),

  goBack: () => {
    const { currentStep, selectedStaff } = get();
    const idx = STEP_ORDER.indexOf(currentStep);

    if (idx > 0) {
      const prevStep = STEP_ORDER[idx - 1];
      // If we are about to go back to 'staff', and we auto-skipped it
      // or we just want to allow going back to 'service' instead if staff wasn't manually selected
      set({ currentStep: prevStep });
    }
  },

  reset: () =>
    set({
      currentStep: 'service',
      selectedService: null,
      selectedStaff: null,
      selectedDate: null,
      selectedTime: null,
      contactInfo: null,
    }),
}));
