# App Backend Combos

Backend para la gestión de ventas de combos, entregas parciales y control mediante QR.

## Tecnologías

- NestJS 11
- TypeScript
- PostgreSQL
- TypeORM
- Swagger
- JWT
- Passport
- bcrypt
- Joi

## Requisitos

- Node.js 22+
- PostgreSQL 15+
- npm 10+

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

## Configuración

Crear el archivo:

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

## Crear base de datos

```sql
CREATE DATABASE combos_db;
```

## Ejecutar migraciones

```bash
npm run typeorm -- migration:run -d src/infrastructure/database/data-source.ts
```

## Ejecutar la aplicación

```bash
npm run start:dev
```

## Swagger

Disponible en:

```text
http://localhost:3000/swagger
```

## Health Check

Disponible en:

```text
http://localhost:3000/api/v1/health
```

## Login

Endpoint:

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "Admin123*"
}
```

Respuesta:

```json
{
  "*ccessToken": "JWT"
}
``*

## Funcionalidades implementadas*
### Ventas

```http
POST /api/v1/*ombo-sales
GET */api/v1/combo-sales/{id}
*``

### Entregas

```http
POST /ap*/v1*combo-sales/{id}/deliver
GET  /api*v1/combo-sales/{id}/deliveries
```*
### QR

```http*POST /api/v1/combo-sales/{id}/gene*ate-qr
GET  /api/v1/combo-sales/{i*}/qr
```

## Seguridad

- JWT Auth*ntication
- bcrypt
- Multiempresa
* companyId obtenido automáticament* desde el JWT

## Estado actual

C*mpletado:

- Arquitectura Hexagona*
- Multiempresa
- JWT Authenticati*n
- Gestión de Ventas
- Gestión de*Entregas
- Generación de QR
- Audi*oría de entregas
- Swagger*- PostgreSQL
- Migraciones

Próxim* Sprint:

- Roles
- RolesGuard
- A*torización por perfil
- Tokens QR *úblicos