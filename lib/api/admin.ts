import { API_BASE_URL } from '@/lib/constants';
import type {
  ProvisionOwnerData,
  AssignUserData,
  CreateBusinessData,
  UpdateOwnerData,
} from '@/lib/schemas/admin';

async function adminFetch<T>(
  endpoint: string,
  token: string,
  options?: { method?: string; body?: unknown },
): Promise<T> {
  const method = options?.method || (options?.body ? 'POST' : 'GET');
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Error desconocido');
    let message = text;
    try {
      const json = JSON.parse(text);
      message = json.message || text;
    } catch {
      // use raw text
    }
    throw new Error(message);
  }

  return res.json();
}

export interface OwnersQuery {
  search?: string;
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export interface OwnerItem {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  business: {
    id: string;
    name: string;
    slug: string;
    category: string;
    phone: string;
    isActive: boolean;
    createdAt: string;
  } | null;
}

export interface PaginatedOwners {
  items: OwnerItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function listOwners(query: OwnersQuery, token: string) {
  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));
  if (query.isActive !== undefined) params.set('isActive', String(query.isActive));
  const qs = params.toString();
  return adminFetch<PaginatedOwners>(
    `/business/admin/owners${qs ? `?${qs}` : ''}`,
    token,
  );
}

export function provisionOwner(data: ProvisionOwnerData, token: string) {
  return adminFetch('/business/admin/provision-owner', token, { body: data });
}

export function assignUser(data: AssignUserData, token: string) {
  return adminFetch('/business/admin/assign-user', token, { body: data });
}

export function createBusinessForUser(
  data: CreateBusinessData,
  token: string,
) {
  return adminFetch('/business/admin/create-business-for-user', token, { body: data });
}

export function updateOwner(userId: string, data: UpdateOwnerData, token: string) {
  return adminFetch(`/business/admin/owners/${userId}`, token, {
    method: 'PATCH',
    body: data,
  });
}

// ── Shared WhatsApp (IT Admin) ────────────────────────────

export interface SharedWaStatus {
  instanceName?: string;
  configured: boolean;
  connected: boolean;
  phoneNumber?: string | null;
  profileName?: string | null;
  message?: string;
}

export interface SharedWaSetupResult {
  instanceName: string;
  alreadyExists?: boolean;
  connected?: boolean;
  instanceId?: string;
  status?: string;
  message: string;
}

export interface SharedWaPairingResult {
  instanceName: string;
  pairingCode: string;
  expiresAt: string;
}

export function getSharedWaStatus(token: string) {
  return adminFetch<SharedWaStatus>('/whatsapp/admin/shared/status', token);
}

export function setupSharedWa(token: string) {
  return adminFetch<SharedWaSetupResult>('/whatsapp/admin/shared/setup', token, {
    method: 'POST',
  });
}

export function getSharedWaPairingCode(phone: string, token: string) {
  return adminFetch<SharedWaPairingResult>(
    '/whatsapp/admin/shared/pairing-code',
    token,
    { body: { phone } },
  );
}

export function disconnectSharedWa(token: string) {
  return adminFetch<{ message: string }>('/whatsapp/admin/shared/disconnect', token, {
    method: 'DELETE',
  });
}
