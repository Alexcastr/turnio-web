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

/**
 * Builds an ISO 8601 string with the UTC offset for the given IANA timezone.
 * Example: toISOWithTimezone('2026-03-27', '15:00', 'America/Bogota')
 *       → '2026-03-27T15:00:00-05:00'
 */
export function toISOWithTimezone(
  date: string,
  time: string,
  timezone: string,
): string {
  const dt = new Date(`${date}T${time}:00`);

  const offsetMinutes = getTimezoneOffset(dt, timezone);
  const sign = offsetMinutes <= 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetMinutes);
  const hh = String(Math.floor(absMinutes / 60)).padStart(2, '0');
  const mm = String(absMinutes % 60).padStart(2, '0');

  return `${date}T${time}:00${sign}${hh}:${mm}`;
}

function getTimezoneOffset(date: Date, timezone: string): number {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
  const tzStr = date.toLocaleString('en-US', { timeZone: timezone });
  return (new Date(utcStr).getTime() - new Date(tzStr).getTime()) / 60_000;
}
