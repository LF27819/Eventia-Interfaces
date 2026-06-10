# Eventia 🎟️

Aplicación web para explorar y reservar entradas a eventos musicales. Incluye autenticación con JWT, paneles de gestión por rol y mapa interactivo en el detalle de cada evento.

Desarrollado como proyecto de la asignatura **Diseño de Interfaces** (2º DAM, curso 2025-2026).

---

## Stack tecnológico

**Backend:** Java 21 · Spring Boot 3.5 · Spring Security · JWT (jjwt 0.12) · MariaDB · Lombok · Maven  
**Frontend:** React 19 · TypeScript · Vite · React Router 7 · Axios · React Leaflet · Vitest  
**Infraestructura:** Docker · Docker Compose

---

## Estructura del proyecto

```
Eventia-Interfaces/
├── docker-compose.yml
├── eventia-backend/          # API REST — Spring Boot
│   └── src/main/java/.../
│       ├── config/           # CORS y SecurityConfig
│       ├── controller/       # AuthController, EventoController, ReservaController...
│       ├── domain/           # Entidades JPA: Usuario, Evento, Reserva, Artista, Recinto
│       ├── security/         # JwtService, JwtAuthFilter, CustomUserDetailsService
│       └── service/          # Lógica de negocio
└── eventia-frontend/         # SPA — React + TypeScript
    └── src/
        ├── api/              # Servicios centralizados (authService, eventService...)
        ├── context/          # AuthContext — estado global de sesión
        ├── reducers/         # authReducer + reducers de cada dashboard
        ├── routes/           # AppRouter, ProtectedRoute, RoleRoute
        ├── pages/            # HomePage, EventsPage, AdminPage, OrganizerPage...
        ├── components/       # Dashboard, eventos, layout
        ├── tests/            # Tests unitarios con Vitest
        └── utils/            # Utilidades de roles
```

---

## Arranque con Docker (recomendado)

```bash
docker compose up --build
```

| Servicio  | URL                   |
|-----------|-----------------------|
| Frontend  | http://localhost:5175 |
| Backend   | http://localhost:8080 |
| Base de datos | localhost:3315    |

Para parar y limpiar: `docker compose down -v`

---

## Arranque manual

**Backend** — requiere MariaDB en local configurada según `application.properties`
```bash
cd eventia-backend
./mvnw spring-boot:run
```

**Frontend**
```bash
cd eventia-frontend
npm install
npm run dev
```

Crea un `.env.local` si necesitas cambiar la URL del backend:
```
VITE_API_URL=http://localhost:8080
```

---

## Usuarios de prueba

Cargados automáticamente desde `data.sql` al arrancar con Docker.

| Email | Contraseña | Rol |
|---|---|---|
| lucia@gmail.com | cliente | CLIENTE |
| carlos@gmail.com | organiz | ORGANIZADOR |
| ana@gmail.com | admin| ADMIN |

---

## Funcionalidades

### Autenticación JWT
El backend genera un token JWT al hacer login o registro. El frontend lo guarda en `localStorage` y lo envía en cada petición como `Authorization: Bearer <token>`. Al recargar la página, el token se valida contra `/auth/me` para restaurar la sesión automáticamente.

### Control de acceso por roles
Hay tres roles: `ADMIN`, `ORGANIZADOR` y `CLIENTE`. Las rutas protegidas usan dos guards:
- `ProtectedRoute` — requiere estar logueado.
- `RoleRoute` — requiere además el rol correcto; si no coincide, redirige a `/perfil`.

### Estado global
La sesión se gestiona con **Context API + `useReducer`** sin librerías externas. Los dashboards tienen cada uno su propio reducer local para gestionar carga, error y filtros.

### Dashboards por rol
Cada rol tiene su panel con cards de resumen, tabla de datos y filtros reactivos (búsqueda, categoría, fecha, ordenación):
- **Admin** → tabla de todos los eventos
- **Organizador** → tabla de eventos con métricas de entradas
- **Cliente** → tabla de sus reservas, filtrable por estado

### Mapa interactivo
La página de detalle de un evento muestra la ubicación del recinto en un mapa usando **React Leaflet + OpenStreetMap**, sin necesidad de API key.

---

## Tests

```bash
cd eventia-frontend
npm run test:run
```

| Fichero | Qué cubre |
|---|---|
| `authReducer.test.ts` | Login, logout, restauración de sesión, actualización de saldo |
| `clientDashboardReducer.test.ts` | Carga de reservas, estados de error, filtros |
| `roles.test.ts` | Funciones `esAdmin()`, `esOrganizador()`, `esCliente()` |
