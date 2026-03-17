import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  durationMinutes: z.number().positive(),
  price: z.number().min(0),
  currency: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number(),
});

export const scheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
});

export const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  phone: z.string(),
  timezone: z.string(),
  logoUrl: z.string().optional().nullable(),
  services: z.array(serviceSchema),
  schedules: z.array(scheduleSchema),
});
