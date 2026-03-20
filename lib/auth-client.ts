import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';
import { API_BASE_URL } from '@/lib/constants';

export const authClient = createAuthClient({
  baseURL: API_BASE_URL.replace(/\/api$/, ''),
  basePath: '/api/auth',
  plugins: [adminClient()],
});
