import { apiFetch } from './client';
import type { Business, BusinessListResponse } from '@/types/business';
import type { AvailabilityResponse } from '@/types/availability';
import type {
  CreateAppointmentDto,
  AppointmentResponse,
} from '@/types/appointment';

export function fetchBusinesses(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<BusinessListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set('search', params.search);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.limit) searchParams.set('limit', String(params.limit));

  const qs = searchParams.toString();
  return apiFetch<BusinessListResponse>(
    `/public/businesses${qs ? `?${qs}` : ''}`,
  );
}

export function fetchBusiness(slug: string): Promise<Business> {
  return apiFetch<Business>(`/public/${slug}`);
}

export function fetchAvailability(
  slug: string,
  date: string,
  serviceId: string,
  staffId?: string | null,
): Promise<AvailabilityResponse> {
  const params = new URLSearchParams({ date, serviceId });
  if (staffId) {
    params.set('staffId', staffId);
  }
  return apiFetch<AvailabilityResponse>(
    `/public/${slug}/availability?${params}`,
  );
}

export function createAppointment(
  slug: string,
  data: CreateAppointmentDto,
): Promise<AppointmentResponse> {
  return apiFetch<AppointmentResponse>(`/public/${slug}/appointments`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
