import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "EEEE d 'de' MMMM", { locale: es });
}

export function formatTime(timeStr: string): string {
  if (timeStr.includes('T')) {
    return format(parseISO(timeStr), 'HH:mm');
  }
  return timeStr;
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}
