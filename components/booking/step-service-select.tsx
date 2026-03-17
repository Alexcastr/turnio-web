'use client';

import { useBookingStore } from '@/lib/store/booking-store';
import { ServiceCard } from './service-card';
import type { Service } from '@/types/business';

interface StepServiceSelectProps {
  services: Service[];
}

export function StepServiceSelect({ services }: StepServiceSelectProps) {
  const { selectedService, selectService } = useBookingStore();

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-text-primary">
        Selecciona un servicio
      </h2>
      <p className="mb-4 text-sm text-text-secondary">
        Elige el servicio que deseas agendar
      </p>

      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedService?.id === service.id}
            onSelect={selectService}
          />
        ))}
      </div>
    </div>
  );
}
