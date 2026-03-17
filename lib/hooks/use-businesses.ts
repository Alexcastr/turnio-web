'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchBusinesses } from '@/lib/api/public';

export function useBusinesses(search: string, page: number = 1) {
  return useQuery({
    queryKey: ['businesses', search, page],
    queryFn: () => fetchBusinesses({ search: search || undefined, page }),
    placeholderData: keepPreviousData,
  });
}
