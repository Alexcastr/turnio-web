import { useMutation } from '@tanstack/react-query';
import { createAppointment } from '@/lib/api/public';
import type { CreateAppointmentDto } from '@/types/appointment';

export function useCreateAppointment(slug: string) {
  return useMutation({
    mutationFn: (data: CreateAppointmentDto) =>
      createAppointment(slug, data),
  });
}
