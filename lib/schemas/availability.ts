import { z } from 'zod';

export const timeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  available: z.boolean(),
});

export const availabilityResponseSchema = z.object({
  slots: z.array(timeSlotSchema),
});
