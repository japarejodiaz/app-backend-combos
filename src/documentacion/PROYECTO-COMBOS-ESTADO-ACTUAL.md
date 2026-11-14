# APP BACKEND COMBOS

## Estado del Proyecto

Fecha de actualización: Sprint B completado.

---

# Stack Tecnológico

Backend:

- NestJS 11
- TypeScript
- PostgreSQL
- TypeORM 0.3.x
- Swagger / OpenAPI
- JWT
- Passport
- bcrypt
- Joi
- Arquitectura Hexagonal

Frontend planificado:

- Angular Admin
- Angular Cliente

---

# Arquitectura

```text
src/
├── domain/
├── application/
├── infrastructure/
├── interfaces/
└── shared/
```

---

# Configuración

## Ambientes

```text
.env.development
.env.test
.env.production
```

---

## Configuración

```text
src/infrastructure/config/

app.config.ts
database.config.ts
auth.config.ts
env.validation.ts
```

---

## Variables JWT

```env
JWT_SECRET=
JWT_EXPIRES_IN=8h
```

---

# Multiempresa (Sprint A)

Estado:

```text
COMPLETADO ✅
```

---

## Entidad Company

```text
Company
```

Campos:

```text
id
code
name
active
createdAt
updatedAt
```

---

## Tabla companies

```sql
companies
```

---

## Empresas de prueba

### DEMO_V2

```text
550e8400-e29b-41d4-a716-446655440000
```

---

### BAR001

Empresa utilizada para pruebas de aislamiento.

---

# Entidades Multiempresa

## ComboSale

Incluye:

```text
company_id
```

---

## DeliveryLog

Incluye:

```text
company_id
```

---

# Seguridad Multiempresa

Todas las consultas de negocio son filtradas por:

```text
companyId
```

obtenido desde JWT.

No se recibe desde el body.

---

# Casos de Uso Implementados

## UC-01 CreateComboSale

Endpoint:

```http
POST /api/v1/combo-sales
```

JWT requerido:

✅ Sí

Body:

```json
{
  "comboId": "uuid",
  "totalUnits": 12
}
```

companyId se obtiene desde JWT.

---

## UC-02 GetComboSaleById

```http
GET /api/v1/combo-sales/{id}
```

JWT requerido:

✅ Sí

Filtrado por:

```text
companyId
```

---

## UC-03 DeliverUnits

```http
POST /api/v1/combo-sales/{id}/deliver
```

JWT requerido:

✅ Sí

Reglas:

- No superar unidades compradas.
- No entregar combos cerrados.
- Cierre automático.

---

## UC-04 GetDeliveries

```http
GET /api/v1/combo-sales/{id}/deliveries
```

JWT requerido:

✅ Sí

Filtrado por:

```text
companyId
```

---

## UC-05 GenerateQr

```http
POST /api/v1/combo-sales/{id}/generate-qr
```

JWT requerido:

✅ Sí

Retorna:

```json
{
  "comboSaleId": "",
  "url": "",
  "qr": "data:image/png;base64..."
}
```

---

## UC-05.1 ViewQr

```http
GET /api/v1/combo-sales/{id}/qr
```

JWT requerido:

✅ Sí

Retorna:

```text
image/png
```

---

# Auditoría

Tabla:

```sql
delivery_logs
```

Campos:

```text
id
company_id
combo_sale_id
units
created_at
```

Cada entrega genera un registro.

---

# Base de Datos

## Table: companies

```text
id
code
name
active
created_at
updated_at
```

---

## Table: combo_sales

```text
id
company_id
combo_id
total_units
delivered_units
status
created_at
updated_at
```

---

## Table: delivery_logs

```text
id
company_id
combo_sale_id
units
created_at
```

---

## Table: users

```text
id
company_id
username
email
password
role
active
created_at
updated_at
```

---

# Seguridad (Sprint B)

Estado:

```text
COMPLETADO ✅
```

---

## Entidad User

Campos:

```text
id
companyId
username
email
password
role
active
```

---

## Roles

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

## PasswordService

Implementado con:

```text
bcrypt
```

Funciones:

```ts
hash()
compare()
```

---

## Login

Endpoint:

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "Admin123*"
}
```

Response:

```json
{
  "accessToken": "JWT"
}
```

---

## JWT

Payload actual:

```json
{
  "sub": "user-id",
  "companyId": "company-id",
  "role": "OWNER",
  "username": "admin"
}
```

---

## JwtStrategy

Implementado.

Extrae:

```text
userId
companyId
role
username
```

---

## JwtAuthGuard

Implementado.

Protege todos los endpoints de negocio.

---

## CurrentUser Decorator

Implementado.

Uso:

```ts
@CurrentUser() user
```

---

# Swagger

URL:

```text
http://localhost:3000/swagger
```

Configurado con:

```ts
.addBearerAuth()
```

---

# Health Check

```http
GET /api/v1/health
```

---

# Pruebas Ejecutadas

## Sprint A

✅ Multiempresa

✅ Empresas múltiples

✅ Aislamiento por companyId

✅ Migraciones

✅ QR

✅ Entregas

✅ Historial

---

## Sprint B

✅ Login

✅ JWT

✅ Password Hash

✅ Guards

✅ Decorator CurrentUser

✅ Create protegido

✅ Get protegido

✅ Deliver protegido

✅ Deliveries protegido

✅ Generate QR protegido

✅ View QR protegido

✅ companyId obtenido automáticamente desde JWT

---

# Próximo Sprint

## Sprint C - Roles y Autorización

Objetivo:

Implementar permisos por rol.

---

## Componentes a construir

### Roles decorator

```ts
@Roles(...)
```

---

### RolesGuard

```ts
RolesGuard
```

---

### Matriz de permisos

| Acción | OWNER | MANAGER | CASHIER | WAITER |
|----------|----------|----------|----------|----------|
| Crear Venta | ✅ | ✅ | ✅ | ❌ |
| Entregar | ✅ | ✅ | ❌ | ✅ |
| Generar QR | ✅ | ✅ | ✅ | ❌ |
| Reportes | ✅ | ✅ | ❌ | ❌ |

---

# Objetivo Arquitectónico

Todos los endpoints de negocio deberán funcionar mediante:

```text
JWT
 ↓
User
 ↓
Company
 ↓
Role
 ↓
Use Case
```

sin recibir companyId desde el cliente.