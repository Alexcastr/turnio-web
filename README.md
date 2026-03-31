# TurnIO — Sistema de Agendamiento Inteligente

> Plataforma de reservas para negocios locales que conecta clientes con trabajadores mediante agendamiento web y notificaciones WhatsApp automatizadas.

**Demo:** [https://turnio.site](https://turnio.site)

---

## Credenciales de prueba

> Cuenta lista para explorar todas las funcionalidades sin configuración previa.

> 📱 **App móvil en acceso anticipado** — la siguiente cuenta ya tiene acceso:
> **[Descargar en Google Play](https://play.google.com/store/apps/details?id=com.turnio.app)**

| Campo    | Valor                      |
|----------|----------------------------|
| Email    | `miduga@gmail.com`         |
| Contraseña | `hackaton2026`           |
| Negocio  | **Midudev** — Mentoría de programación |

---

## Descripción

TurnIO permite a negocios locales (barberías, veterinarias, consultorios, etc.) gestionar sus citas de forma profesional sin complicaciones.

**Flujo completo:**

1. El **administrador IT** crea el negocio desde la web y registra al dueño.
2. El **dueño (owner)** descarga la app móvil, configura su horario y conecta su WhatsApp desde Ajustes.
3. Puede agregar **trabajadores**, quienes también ingresan a la app y definen sus horarios disponibles.
4. Desde Configuración se genera un **link directo al negocio** para compartir con clientes.
5. Los **clientes** acceden a [turnio.site](https://turnio.site), buscan el negocio o usan el link directo, eligen servicio, fecha, horario e ingresan su nombre y WhatsApp.
6. El **trabajador recibe la solicitud** en la app y acepta o rechaza.
7. Al aceptar, el **cliente recibe confirmación automática por WhatsApp**.
8. Se envía un **recordatorio automático** 15 minutos (o 1 hora) antes de la cita.

Los mismos trabajadores también pueden **agendar citas desde la app** y agregar clientes manualmente.

---

## Cómo usar la app móvil

### 👑 Pasos para el dueño del negocio

**1. Inicia sesión**
Abre la app e ingresa con el correo y contraseña que te enviaron.

**2. Configura el horario del negocio**
Ve a **Ajustes → Horario** y activa los días que trabajas con su hora de apertura y cierre.

**3. Agrega tus servicios**
Ve a **Servicios → +** → escribe el nombre y la duración.
Ejemplo: *"Corte de cabello – 30 min"*.

**4. Agrega trabajadores (si tienes equipo)**
Ve a **Equipo → +** → ingresa nombre, correo y contraseña del trabajador.
El trabajador podrá iniciar sesión con esos datos en su celular y configurar su horario personal desde **Ajustes → Mi horario**.

**5. Agrega tus primeros clientes**
Ve a **Clientes → +** → selecciona el prefijo del país e ingresa el número de WhatsApp del cliente.

**6. Conecta WhatsApp** 🔑
Ve a **Ajustes → WhatsApp y Recordatorios → Vincular WhatsApp**.

Aparecerá un **código de 8 letras**. Luego en tu celular:

1. Abre **WhatsApp**
2. Ve a **Configuración → Dispositivos vinculados → Vincular un dispositivo**
3. Selecciona **"Vincular con número de teléfono"** (en vez de escanear QR)
4. Ingresa el código que aparece en la app

> ⚠️ WhatsApp puede mostrar una alerta de *"inicio de sesión desde otro país"*. Es completamente normal — es el servidor de Turnio el que se conecta. Acepta y listo.
>
> 📌 El WhatsApp vinculado es el del dueño del negocio. Todos los mensajes automáticos a clientes (confirmación, recordatorio, cancelación) se envían desde ese número, sin importar qué trabajador atienda la cita.

**7. Activa los recordatorios**
Una vez vinculado, activa el switch **"Enviar recordatorios"** y elige cuándo enviarlos: al confirmar, 15 min antes o 1 hora antes.

**8. Comparte tu link de reservas** 🔗
Cada negocio tiene un link único para que los clientes agenden solos desde el navegador, sin descargar ninguna app:

```
turnio.site/nombre-de-tu-negocio
```

Compártelo por WhatsApp, Instagram, Facebook o donde quieras. El cliente elige servicio, trabajador, fecha y hora en menos de 2 minutos. Tú recibes la cita en tu agenda y el cliente recibe confirmación automática por WhatsApp.

**9. Crea tu primera cita manualmente**
Ve a **Agenda → +** (botón verde) → selecciona cliente, servicio, trabajador, fecha y hora.

---

### 👷 Pasos para el trabajador

1. Descarga la app e inicia sesión con el correo y contraseña que te dio el dueño.
2. Ve a **Ajustes → Mi horario** y configura los días y horas en que trabajas.
3. Desde **Agenda** puedes ver y gestionar tus citas asignadas.
4. Puedes **confirmar o cancelar** citas — el cliente recibe el mensaje automáticamente por WhatsApp.

---

## Capturas de pantalla

### Web — Agendamiento

![Web](public/screenshots/web.png)

### App Móvil

| Agenda | Clientes | Servicios |
|--------|----------|-----------|
| ![Agenda](public/screenshots/mobile/agenda.webp) | ![Clientes](public/screenshots/mobile/clients.webp) | ![Servicios](public/screenshots/mobile/services.webp) |

| Equipo | Configuración |
|--------|---------------|
| ![Equipo](public/screenshots/mobile/team.webp) | ![Config](public/screenshots/mobile/config.webp) |

### Panel de administración IT

| Crear owner | Panel IT |
|-------------|----------|
| ![Crear owner](public/screenshots/it-admin-create-owner.png) | ![IT Admin](public/screenshots/it-admin.png) |

### Infraestructura en CubePath

| Dokploy Deploy | CubePath |
|----------------|----------|
| ![Dokploy](public/screenshots/dokploye-deploy.png) | ![CubePath](public/screenshots/cubepath.png) |

---

## Cómo se utilizó CubePath

Toda la infraestructura backend corre en una **VPS de CubePath** gestionada con **Dokploy**:

| Servicio | Tecnología | Plataforma |
|----------|-----------|------------|
| API Backend | NestJS | Dokploy (CubePath VPS) |
| Base de datos | PostgreSQL | Dokploy (CubePath VPS) |
| Mensajería WhatsApp | Evolution API | Dokploy (CubePath VPS) |
| Cache / Sesiones | Redis | Dokploy (CubePath VPS) |
| Frontend | Next.js | Vercel |

> **Nota sobre recursos:** Con los créditos de CubePath intenté desplegar también el frontend en la VPS, pero la capacidad de disco disponible no lo permitía junto con todos los servicios backend. Opté por mantener la infraestructura crítica (API, DB, WhatsApp, Redis) en CubePath y el frontend en Vercel, logrando un equilibrio óptimo sin sobrecargar el VPS.

---

## Stack tecnológico

- **Frontend:** Next.js (Vercel)
- **App Móvil:** React Native (Expo)
- **Backend:** NestJS
- **Base de datos:** PostgreSQL
- **Cache:** Redis
- **WhatsApp:** Evolution API
- **Infraestructura:** CubePath VPS + Dokploy

---

## Contacto

**Email:** castro.t.alex@gmail.com
