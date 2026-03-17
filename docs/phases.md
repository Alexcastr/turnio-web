# TurnIO Web - Fases de Implementacion

## Resumen del Proyecto

Website publica de reservas para TurnIO. Los clientes visitan `/{slug-del-negocio}` y completan un wizard de 5 pasos para agendar una cita. Construido con Next.js 16, React 19, Tailwind CSS v4, TanStack Query, Zustand, Zod + React Hook Form.

**Backend API:** `http://localhost:3001/api` (NestJS)

---

## Fase 0: Scaffolding y Limpieza

**Estado:** Completada

- Instalacion de dependencias: `@tanstack/react-query`, `zustand`, `zod`, `react-hook-form`, `@hookform/resolvers`, `date-fns`, `lucide-react`
- Eliminacion de SVGs boilerplate de `public/`
- Configuracion de `globals.css` con paleta de colores completa y `@theme inline` de Tailwind v4
- Creacion de `lib/constants.ts` (API_BASE_URL, BOOKING_STEPS)
- Creacion de `lib/utils/cn.ts` (utilidad para merge de clases CSS)
- Creacion de `lib/providers.tsx` (QueryClientProvider wrapper)
- Actualizacion de `app/layout.tsx` (metadata, Providers, lang="es")

---

## Fase 1: Types, Schemas y API Layer

**Estado:** Completada

### Types (`types/`)
- `business.ts` - Interfaces: Business, Service, Schedule
- `availability.ts` - Interfaces: TimeSlot, AvailabilityResponse
- `appointment.ts` - Interfaces: CreateAppointmentDto, AppointmentResponse

### Zod Schemas (`lib/schemas/`)
- `business.ts` - Validacion runtime de datos del negocio
- `availability.ts` - Validacion de slots disponibles
- `appointment.ts` - Validacion del formulario de contacto (nombre, telefono, email, notas)

### API Client (`lib/api/`)
- `client.ts` - Fetch wrapper con manejo de errores (ApiError class)
- `public.ts` - Funciones: `fetchBusiness`, `fetchAvailability`, `createAppointment`

### Utilidades (`lib/utils/`)
- `format.ts` - Formateo de fechas (date-fns/es), horas, precios, duraciones

---

## Fase 2: State Management y Query Hooks

**Estado:** Completada

### Zustand Store (`lib/store/`)
- `booking-store.ts` - Estado del wizard: `currentStep`, `selectedService`, `selectedDate`, `selectedTime`, `contactInfo`. Acciones: `selectService`, `selectDate`, `selectTime`, `setContactInfo`, `goBack`, `reset`

### TanStack Query Hooks (`lib/hooks/`)
- `use-business.ts` - Query hook para datos del negocio (con soporte de `initialData` para SSR)
- `use-availability.ts` - Query hook para slots disponibles (se activa solo con fecha + serviceId)
- `use-create-appointment.ts` - Mutation hook para crear citas

---

## Fase 3: Componentes UI

**Estado:** Completada

### Primitivos (`components/ui/`)
- `button.tsx` - Variantes: primary, secondary, ghost. Soporta loading state
- `card.tsx` - Contenedor con bordes redondeados y fondo elevado
- `input.tsx` - Input con label, error message, compatible con React Hook Form (forwardRef)
- `skeleton.tsx` - Placeholder animado para estados de carga
- `stepper.tsx` - Indicador de progreso de 5 pasos
- `badge.tsx` - Pill para categorias/estados

### Landing Page (`components/landing/`)
- `hero-section.tsx` - Hero con titulo, subtitulo, campo de busqueda por slug y CTA
- `features-section.tsx` - Grid de 3 columnas: Busca, Elige, Confirma
- `footer.tsx` - Footer minimalista "Powered by TurnIO"

### Booking (`components/booking/`)
- `business-header.tsx` - Logo (o inicial), nombre, categoria, telefono
- `booking-wizard.tsx` - Orquestador del wizard, renderiza el paso activo
- `service-card.tsx` - Tarjeta de servicio con duracion y precio
- `step-service-select.tsx` - Paso 1: Seleccion de servicio
- `date-selector.tsx` - Widget de calendario mensual
- `step-date-pick.tsx` - Paso 2: Seleccion de fecha
- `time-slot-grid.tsx` - Grid de botones de horarios disponibles
- `step-time-pick.tsx` - Paso 3: Seleccion de hora (fetch de availability)
- `step-contact-form.tsx` - Paso 4: Formulario con React Hook Form + Zod
- `step-confirmation.tsx` - Paso 5: Resumen y confirmacion (mutation)
- `booking-success.tsx` - Pantalla de exito con detalles de la cita

---

## Fase 4: Paginas y Rutas

**Estado:** Completada

- `app/page.tsx` - Landing page minimalista con CTA para buscar negocios
- `app/[slug]/page.tsx` - Server component: fetch SSR del negocio + wizard de reservas
- `app/[slug]/loading.tsx` - Skeleton loader durante la carga
- `app/[slug]/not-found.tsx` - Pagina "Negocio no encontrado"
- `app/not-found.tsx` - 404 global con branding TurnIO

---

## Arquitectura

```
Flujo de datos:
app/[slug]/page.tsx (Server) -> fetchBusiness(slug) -> pasa como prop
  |-> BookingWizard (Client)
      |-> StepServiceSelect  (usa business.services del prop)
      |-> StepDatePick       (usa business.schedules del prop)
      |-> StepTimePick       (llama useAvailability hook -> API)
      |-> StepContactForm    (React Hook Form + Zod validacion)
      |-> StepConfirmation   (llama useCreateAppointment -> API)
      |-> BookingSuccess     (muestra resultado, opcion de reset)
```

### Separacion de Estado
- **Zustand**: Estado efimero del wizard (paso actual, selecciones del usuario)
- **TanStack Query**: Datos del servidor (negocio, disponibilidad) con cache automatico

### Endpoints del Backend Consumidos
| Metodo | Endpoint | Uso |
|--------|--------------------------------------|------|
| GET | `/api/public/:slug` | Datos del negocio (SSR + client) |
| GET | `/api/public/:slug/availability` | Slots disponibles (client-side) |
| POST | `/api/public/:slug/appointments` | Crear cita (mutation) |

---

## Stack Tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router, Server Components) |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Type safety (modo estricto) |
| Tailwind CSS | 4.x | Estilos (CSS-first config) |
| TanStack Query | 5.x | Server state management |
| Zustand | 5.x | Client state management |
| Zod | 4.x | Validacion de schemas |
| React Hook Form | 7.x | Manejo de formularios |
| date-fns | 4.x | Manipulacion de fechas |
| lucide-react | 0.577.x | Iconos |
| Bun | 1.3.x | Package manager y runtime |
