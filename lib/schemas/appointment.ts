import { z } from 'zod';

export const appointmentFormSchema = z.object({
  clientName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  clientPhone: z
    .string()
    .check(
      z.regex(/^\+\d{1,4}\d{7,15}$/, 'Ingresa un número de teléfono válido'),
    ),
  clientEmail: z
    .string()
    .email('Correo electrónico inválido')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
