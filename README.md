# App Backend Combos

Backend para la gestión de ventas de combos, entregas parciales, control mediante QR y operación multiempresa.

## Tecnologías

- NestJS 11
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- bcrypt
- Joi
- Swagger

## Instalación

### Clonar repositorio

```bash
git clone <repositorio>
cd app-backend-combos
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Crear:

```text
.env.development
```

Ejemplo:

```env
APP_NAME=Combos API
APP_ENV=development
APP_PORT=3000

API_PREFIX=api

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=combos_db

JWT_SECRET=MiClaveSuperSecretaJWT
JWT_EXPIRES_IN=8h
```

### Ejecutar migraciones

```bash
npm run typeorm -- migration:run -d src/infrastructure/database/data-source.ts
```

### Ejecutar proyecto

```bash
npm run start:dev
```

---

## Swagger

```text
http://localhost:3000/swagger
```

---

## Funcionalidades Implementadas

### Combo Sales

```http
POST   /api/v1/combo-sales
GET    /api/v1/combo-sales/{id}

POST   /api/v1/combo-sales/{id}/deliver

GET    /api/v1/combo-sales/{id}/deliveries

POST   /api/v1/combo-sales/{id}/generate-qr

GET    /api/v1/combo-sales/{id}/qr
```

### Companies

```http
POST   /api/v1/companies

GET    /api/v1/companies

GET    /api/v1/companies/{id}

PATCH  /api/v1/companies/{id}/activate

PATCH  /api/v1/companies/{id}/deactivate
```

### Users

```http
POST   /api/v1/users
```

---

## Seguridad

- JWT Authentication
- RolesGuard
- bcrypt
- Multiempresa
- companyId obtenido desde JWT

---

## Estado Actual

Completado:

- Arquitectura Hexagonal
- Multiempresa
- Seguridad JWT
- Gestión de Empresas
- Gestión de Ventas
- Gestión de Entregas
- Generación de QR
- Gestión de Usuarios (Creación)
- Swagger
- PostgreSQL

En desarrollo:

- Consulta de usuarios
- Activación y desactivación de usuarios
- Angular Admin
- Angular Cliente