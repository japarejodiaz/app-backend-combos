# Estado Actual del Proyecto

## Sprint A - Multiempresa

Estado:

```text
COMPLETADO
```

### Implementado

- Company
- company_id en entidades de negocio
- Migraciones multiempresa
- Aislamiento de datos por empresa

### Empresas

Endpoints:

```http
POST   /companies
GET    /companies
GET    /companies/{id}
PATCH  /companies/{id}/activate
PATCH  /companies/{id}/deactivate
```

Acceso:

```text
SUPER_ADMIN
```

---

## Sprint B - Seguridad

Estado:

```text
COMPLETADO
```

### Implementado

- JWT
- bcrypt
- AuthModule
- LoginUseCase
- JwtStrategy
- JwtAuthGuard
- CurrentUser Decorator
- Configuración con Joi

### Login

```http
POST /auth/login
```

---

## Sprint C - Roles

Estado:

```text
COMPLETADO
```

### Implementado

- UserRole enum
- Roles Decorator
- RolesGuard
- Matriz de permisos

Roles:

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

## Módulo Combo Sales

Estado:

```text
COMPLETADO
```

### Casos de Uso

#### UC-01

CreateComboSale

```http
POST /combo-sales
```

#### UC-02

GetComboSaleById

```http
GET /combo-sales/{id}
```

#### UC-03

DeliverUnits

```http
POST /combo-sales/{id}/deliver
```

#### UC-04

GetDeliveries

```http
GET /combo-sales/{id}/deliveries
```

#### UC-05

GenerateQr

```http
POST /combo-sales/{id}/generate-qr
```

#### UC-05.1

ViewQr

```http
GET /combo-sales/{id}/qr
```

---

## Módulo Companies

Estado:

```text
COMPLETADO
```

### UC-06.1

CreateCompany

✅

### UC-06.2

GetCompanies

✅

### UC-06.3

GetCompanyById

✅

### UC-06.4

DeactivateCompany

✅

### UC-06.5

ActivateCompany

✅

---

## Módulo Users

Estado:

```text
EN DESARROLLO
```

### UC-07.1

CreateUser

✅ COMPLETADO

Funcionalidad implementada:

- Username único
- Email único
- Password hash
- Herencia automática de companyId
- Validación jerárquica de roles

---

### UC-07.2

GetUsers

🚧 Pendiente

---

### UC-07.3

GetUserById

🚧 Pendiente

---

### UC-07.4

UpdateUser

🚧 Pendiente

---

### UC-07.5

DeactivateUser

🚧 Pendiente

---

### UC-07.6

ActivateUser

🚧 Pendiente

---

## Próximo Objetivo

Finalizar completamente el módulo Users:

```text
GetUsers
GetUserById
UpdateUser
DeactivateUser
ActivateUser
```

Posteriormente:

```text
QR Públicos
Angular Admin
Angular Cliente
Reportes
```