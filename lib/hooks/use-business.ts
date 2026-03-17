import { useQuery } from '@tanstack/react-query';
import { fetchBusiness } from '@/lib/api/public';
import type { Business } from '@/types/business';

export function useBusiness(slug: string, initialData?: Business) {
  return useQuery({
    queryKey: ['business', slug],
    queryFn: () => fetchBusiness(slug),
    initialData,
    enabled: !!slug,
  });
}
