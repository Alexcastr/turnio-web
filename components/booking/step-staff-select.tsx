'use client';

import { useBookingStore } from '@/lib/store/booking-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Users } from 'lucide-react';
import type { StaffWorker } from '@/types/business';
import Image from 'next/image';

interface StepStaffSelectProps {
  staff?: StaffWorker[];
}

export function StepStaffSelect({ staff = [] }: StepStaffSelectProps) {
  const { selectStaff, goBack } = useBookingStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Seleccionar profesional</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className="cursor-pointer hover:border-primary transition-colors flex items-center space-x-4"
          onClick={() => selectStaff(null)}
          padding="md"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium">Cualquier profesional disponible</p>
            <p className="text-sm text-muted-foreground">
              Asignación automática
            </p>
          </div>
        </Card>

        {staff.map((worker) => (
          <Card
            key={worker.id}
            className="cursor-pointer hover:border-primary transition-colors flex items-center space-x-4"
            onClick={() => selectStaff(worker)}
            padding="md"
          >
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center overflow-hidden relative">
              {worker.image ? (
                <Image
                  src={worker.image}
                  alt={worker.displayName || worker.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">
                {worker.displayName || worker.name}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-start">
        <Button variant="secondary" onClick={goBack}>
          Atrás
        </Button>
      </div>
    </div>
  );
}
