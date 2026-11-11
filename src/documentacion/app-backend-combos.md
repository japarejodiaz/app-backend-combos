# APP BACKEND COMBOS

## Información general

Backend para la gestión de combos, entregas parciales, códigos QR y operación multiempresa.

### Tecnologías

- NestJS 11
- TypeORM 0.3.x
- PostgreSQL
- Swagger/OpenAPI
- Joi
- JWT (seguridad en desarrollo)
- Arquitectura hexagonal

## Arquitectura

```text
src/
├── domain/
├── application/
├── infrastructure/
├── interface/
└── shared/
```

### Domain

Contiene las entidades, enumeraciones y repositorios definidos como puertos. Esta capa no depende de NestJS.

### Application

Contiene los casos de uso, DTOs de entrada y la orquestación de las reglas de negocio.

### Infrastructure

Contiene los adaptadores de persistencia con TypeORM y PostgreSQL, configuración, seguridad, generación de QR y migraciones.

### Interface

Contiene los controladores, módulos, DTOs de respuesta y documentación Swagger.

## Configuración de ambientes

Se utilizan archivos de configuración por ambiente:

- `.env.development`
- `.env.test`
- `.env.production`

La configuración de la aplicación se encuentra en `src/infrastructure/config/`:

```text
app.config.ts
database.config.ts
auth.config.ts
env.validation.ts
```

Las variables de entorno se validan mediante Joi.

## Base de datos

### Migraciones

Las migraciones documentadas crean las siguientes tablas:

| Migración | Tabla | Campos |
|---|---|---|
| `InitialComboSale` | `combo_sales` | `id`, `company_id`, `combo_id`, `total_units`, `delivered_units`, `status`, `created_at`, `updated_at` |
| `CreateDeliveryLogs` | `delivery_logs` | `id`, `company_id`, `combo_sale_id`, `units`, `created_at` |
| `CreateCompanies` | `companies` | `id`, `code`, `name`, `active`, `created_at`, `updated_at` |
| `CreateUsers` | `users` | `id`, `company_id`, `username`, `email`, `password`, `role`, `active`, `created_at`, `updated_at` |

### Multiempresa (Sprint A)

**Estado: completado.**

El modelo relaciona una empresa con sus ventas y registros de entrega:

```text
Company
  ├── ComboSale
  └── DeliveryLog
```

Las tablas de negocio incluyen `company_id` para asociar los registros con una empresa.

Empresas registradas para las pruebas multiempresa:

| Código | ID | Descripción |
|---|---|---|
| `DEMO_V2` | `550e8400-e29b-41d4-a716-446655440000` | Empresa utilizada para pruebas multiempresa (`BAR001`) |

## Casos de uso implementados

### UC-01: Crear venta

**Ruta:** `POST /api/v1/combo-sales`

Ejemplo de solicitud:

```json
{
  "companyId": "550e8400-e29b-41d4-a716-446655440000",
  "comboId": "95cba18d-7775-4895-a564-f06057f8d4df",
  "totalUnits": 12
}
```

### UC-02: Consultar venta

**Ruta:** `GET /api/v1/combo-sales/{id}`

### UC-03: Entregar unidades

**Ruta:** `POST /api/v1/combo-sales/{id}/deliver`

Solicitud:

```json
{
  "units": 2
}
```

Reglas de negocio:

- No se permite entregar más unidades que el total comprado.
- No se pueden entregar unidades de combos cerrados.
- La venta se cierra automáticamente al completar todas las unidades.

### UC-04: Consultar historial de entregas

**Ruta:** `GET /api/v1/combo-sales/{id}/deliveries`

El historial se obtiene de la tabla `delivery_logs`.

### UC-05: Generar QR

**Ruta:** `POST /api/v1/combo-sales/{id}/generate-qr`

Respuesta de ejemplo:

```json
{
  "comboSaleId": "",
  "url": "",
  "qr": "data:image/png;base64,..."
}
```

### UC-05.1: Visualizar QR

**Ruta:** `GET /api/v1/combo-sales/{id}/qr`

Devuelve una imagen con tipo de contenido `image/png`. La visualización fue validada mediante escaneo real.

## Health check y Swagger

- **Health check:** `GET /api/v1/health`
- **Swagger/OpenAPI:** `http://localhost:3000/swagger`

## Seguridad (Sprint B)

**Estado: en desarrollo.**

### Implementado

- Dominio de usuario: `User`, `UserRole` y `UserRepository`.
- Persistencia: `UserOrmEntity` y `PostgresUserRepository`.
- Configuración de autenticación: `AuthModule` y `auth.config.ts`.
- Variables JWT: `JWT_SECRET` y `JWT_EXPIRES_IN`.
- Carga de configuración mediante `ConfigService`.
- Roles disponibles: `SUPER_ADMIN`, `OWNER`, `MANAGER`, `CASHIER`, `WAITER` y `CLIENT`.

Configuración JWT prevista:

```env
JWT_SECRET=
JWT_EXPIRES_IN=8h
```

### Pendientes del Sprint B

**B.3**

- `PasswordService` con bcrypt.
- Hash de contraseña para el administrador.
- `LoginUseCase`.
- `LoginResponseDto` y `LoginDto`.
- Endpoint `POST /api/v1/auth/login`.

**B.4**

- `JwtStrategy` y `JwtAuthGuard`.
- `RolesGuard`.
- Decoradores `@Roles` y `@CurrentUser`.

**B.5**

- Eliminar `companyId` de las solicitudes.
- Obtener la empresa asociada desde el JWT autenticado.

## Arquitectura objetivo

```text
Angular Admin ──┐
                ├──> NestJS ───> PostgreSQL
Angular Cliente ┘
```

## Frontend futuro

### Angular Admin

Módulos previstos: `auth`, `dashboard`, `combo-sales`, `deliveries`, `users`, `companies`, `reports` y `qr`.

### Angular Cliente

Módulos previstos: `customer-home`, `combo-status` y `delivery-history`.

## Estado general del proyecto

| Sprint | Estado | Alcance |
|---|---|---|
| Sprint A | Completado | Multiempresa, empresas, `company_id`, migraciones y refactor de casos de uso |
| Sprint B | En progreso | Usuarios, roles, JWT y seguridad |

## Próximo hito

Implementar el endpoint `POST /api/v1/auth/login`.

Solicitud de ejemplo:

```json
{
  "username": "admin",
  "password": "Admin123*"
}
```

Respuesta esperada:

```json
{
  "accessToken": "JWT"
}
```

Con este hito comenzará la autenticación y autorización completa del sistema.
