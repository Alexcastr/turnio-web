# IT Admin Panel - Design Spec

## Overview

Private admin panel accessible at `/it-admin` for managing business owners and businesses. No visible links from the public app — the IT admin navigates directly by URL.

## Authentication

- **Provider:** Better Auth (backend at `NEXT_PUBLIC_API_URL/auth/*`)
- **Method:** Email + password via `signIn.email()` from `better-auth/react`
- **Guard:** Backend uses `ItAdminGuard` which checks email against `IT_ADMIN_EMAILS` env allowlist
- **Session:** Bearer token stored via Better Auth cookies, sent automatically
- **Route protection:** Next.js `proxy.ts` checks session for `/it-admin` routes (except `/it-admin/login`)

## Routes

| Path | Description | Auth Required |
|------|-------------|---------------|
| `/it-admin/login` | Login form | No |
| `/it-admin` | Dashboard (redirects to provision-owner) | Yes |
| `/it-admin/provision-owner` | Create owner + business | Yes |
| `/it-admin/assign-user` | Assign user to business | Yes |
| `/it-admin/create-business` | Create business for existing user | Yes |

## Layout

- **Sidebar (left):** 3 navigation items + logout button
- **Main area (right):** Active form
- **Header:** "Turnio Admin" text + theme toggle
- Same design tokens as public app (emerald primary, light/dark theme)

## Endpoints

All use Bearer token from login session.

### POST `/business/admin/provision-owner`
Create owner account + business in one operation.
```
Body: {
  email, password, ownerName,
  businessName, category, phone, timezone?,
  schedules: [{ dayOfWeek, startTime, endTime, isOpen }],
  services: [{ name, durationMin, price?, color? }]
}
```

### POST `/business/admin/assign-user`
Assign existing user to existing business.
```
Body: { userId, businessId, role }
```

### POST `/business/admin/create-business-for-user`
Create business for existing user without one.
```
Body: {
  userId, name, category, phone, timezone?,
  schedules?: [...], services?: [...]
}
```

## Forms

### Provision Owner (single page, collapsible sections)
1. **Datos del propietario:** email, password, nombre
2. **Datos del negocio:** nombre, categoría, teléfono, timezone
3. **Horarios:** 7 días pre-llenados (L-V 08:00-18:00, S 09:00-14:00, D cerrado)
4. **Servicios:** lista dinámica (agregar/eliminar)

### Assign User
Simple form: userId, businessId, role (select)

### Create Business for User
Similar to provision-owner minus credentials. userId + business data + optional schedules/services.

## Tech Stack
- `better-auth` client for auth
- `proxy.ts` (Next.js 16) for route protection
- React Query mutations for API calls
- react-hook-form + zod for validation
- Existing UI components (Button, Card, Input)
