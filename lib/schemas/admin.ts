import { z } from 'zod';

const scheduleSchema = z.object({
  dayOfWeek: z.string(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato HH:MM'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Formato HH:MM'),
  isOpen: z.boolean(),
});

const serviceSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  durationMin: z.number().min(5, 'Mínimo 5 minutos'),
  price: z.number().min(0).optional(),
  color: z.string().optional(),
});

export const provisionOwnerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  ownerName: z.string().min(1, 'Nombre requerido'),
  businessName: z.string().min(1, 'Nombre del negocio requerido'),
  category: z.string().min(1, 'Categoría requerida'),
  phone: z.string().min(1, 'Teléfono requerido'),
  timezone: z.string().optional(),
  schedules: z.array(scheduleSchema),
  services: z.array(serviceSchema).min(1, 'Agrega al menos un servicio'),
});

export const assignUserSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  businessId: z.string().min(1, 'ID de negocio requerido'),
  role: z.enum(['OWNER', 'STAFF']),
});

export const createBusinessSchema = z.object({
  userId: z.string().min(1, 'ID de usuario requerido'),
  name: z.string().min(1, 'Nombre requerido'),
  category: z.string().min(1, 'Categoría requerida'),
  phone: z.string().min(1, 'Teléfono requerido'),
  timezone: z.string().optional(),
  schedules: z.array(scheduleSchema).optional(),
  services: z.array(serviceSchema).optional(),
});

export type ProvisionOwnerData = z.infer<typeof provisionOwnerSchema>;
export type AssignUserData = z.infer<typeof assignUserSchema>;
export type CreateBusinessData = z.infer<typeof createBusinessSchema>;
