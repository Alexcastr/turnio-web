import { useQuery } from '@tanstack/react-query';
import { fetchAvailability } from '@/lib/api/public';

export function useAvailability(
  slug: string,
  date: string | null,
  serviceId: string | null,
  staffId: string | null = null,
) {
  return useQuery({
    queryKey: ['availability', slug, date, serviceId, staffId],
    queryFn: () => fetchAvailability(slug, date!, serviceId!, staffId),
    enabled: !!slug && !!date && !!serviceId,
  });
}
