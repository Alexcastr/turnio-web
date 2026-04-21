'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import {
  provisionOwner,
  assignUser,
  createBusinessForUser,
  listOwners,
  updateOwner,
  searchAdminUsers,
  searchAdminBusinesses,
  getSharedWaStatus,
  setupSharedWa,
  getSharedWaPairingCode,
  disconnectSharedWa,
  type OwnersQuery,
} from '@/lib/api/admin';
import type {
  ProvisionOwnerData,
  AssignUserData,
  CreateBusinessData,
  UpdateOwnerData,
} from '@/lib/schemas/admin';

async function getToken(): Promise<string> {
  const session = await authClient.getSession();
  const token = session.data?.session?.token;
  if (!token) throw new Error('No hay sesión activa');
  return token;
}

export function useOwners(query: OwnersQuery) {
  return useQuery({
    queryKey: ['admin-owners', query],
    queryFn: async () => {
      const token = await getToken();
      return listOwners(query, token);
    },
  });
}

export function useProvisionOwner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProvisionOwnerData) => {
      const token = await getToken();
      return provisionOwner(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-owners'] });
    },
  });
}

export function useAssignUser() {
  return useMutation({
    mutationFn: async (data: AssignUserData) => {
      const token = await getToken();
      return assignUser(data, token);
    },
  });
}

export function useCreateBusiness() {
  return useMutation({
    mutationFn: async (data: CreateBusinessData) => {
      const token = await getToken();
      return createBusinessForUser(data, token);
    },
  });
}

export function useUpdateOwner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, data }: { userId: string; data: UpdateOwnerData }) => {
      const token = await getToken();
      return updateOwner(userId, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-owners'] });
    },
  });
}

export function useSearchAdminUsers(search: string, enabled = true) {
  return useQuery({
    queryKey: ['admin-users-search', search],
    queryFn: async () => {
      const token = await getToken();
      return searchAdminUsers(search, 8, token);
    },
    enabled,
    staleTime: 10_000,
  });
}

export function useSearchAdminBusinesses(search: string, enabled = true) {
  return useQuery({
    queryKey: ['admin-businesses-search', search],
    queryFn: async () => {
      const token = await getToken();
      return searchAdminBusinesses(search, 8, token);
    },
    enabled,
    staleTime: 10_000,
  });
}

// ── Shared WhatsApp ───────────────────────────────────────

export function useSharedWaStatus(enabled = true) {
  return useQuery({
    queryKey: ['admin-shared-wa-status'],
    queryFn: async () => {
      const token = await getToken();
      return getSharedWaStatus(token);
    },
    enabled,
    staleTime: 0,
  });
}

export function useSetupSharedWa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return setupSharedWa(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shared-wa-status'] });
    },
  });
}

export function useSharedWaPairingCode() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const token = await getToken();
      return getSharedWaPairingCode(phone, token);
    },
  });
}

export function useDisconnectSharedWa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return disconnectSharedWa(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-shared-wa-status'] });
    },
  });
}
