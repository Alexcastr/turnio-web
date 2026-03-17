export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const BOOKING_STEPS = [
  { id: 'service', label: 'Servicio' },
  { id: 'staff', label: 'Personal' },
  { id: 'date', label: 'Fecha' },
  { id: 'time', label: 'Hora' },
  { id: 'contact', label: 'Datos' },
  { id: 'confirm', label: 'Confirmar' },
] as const;
