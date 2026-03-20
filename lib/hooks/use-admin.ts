'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import {
  provisionOwner,
  assignUser,
  createBusinessForUser,
  listOwners,
  type OwnersQuery,
} from '@/lib/api/admin';
import type {
  ProvisionOwnerData,
  AssignUserData,
  CreateBusinessData,
} from '@/lib/schemas/admin';

async function getToken(): Promise<string> {
  const cookieToken = document.cookie
    .split('; ')
    .find((c) => c.startsWith('admin_session='))
    ?.split('=')[1];
  if (cookieToken) return cookieToken;

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
