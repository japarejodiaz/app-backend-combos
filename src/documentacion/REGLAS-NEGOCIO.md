# Reglas de Negocio

## RN-001 Multiempresa

Toda operación del sistema debe ejecutarse dentro del contexto de una empresa.

La empresa nunca debe ser enviada por el cliente.

La empresa se obtiene desde el JWT autenticado.

```text
JWT
 ↓
companyId
 ↓
Caso de Uso
```

---

## RN-002 Aislamiento de Datos

Un usuario únicamente puede acceder a información perteneciente a su empresa.

Si un recurso existe pero pertenece a otra empresa, el sistema responderá:

```http
404 Not Found
```

---

## RN-003 Propiedad de la Venta

Toda venta de combo pertenece exactamente a una empresa.

```text
Company
  |
  └── ComboSale
```

---

## RN-004 Estado Inicial de la Venta

Toda venta inicia con estado:

```text
OPEN
```

---

## RN-005 Unidades Entregadas Iniciales

Toda venta creada debe iniciar con:

```text
deliveredUnits = 0
```

---

## RN-006 Cálculo de Pendientes

Las unidades pendientes se calculan mediante:

```text
pendingUnits =
totalUnits - deliveredUnits
```

---

# Entregas

## RN-007 No Sobre Entregar

No se permite entregar más unidades de las compradas.

Ejemplo:

```text
Compradas = 12
Entregadas = 11
Nueva Entrega = 2
```

Resultado:

```http
400 Bad Request
```

---

## RN-008 No Entregar Ventas Cerradas

No se pueden registrar entregas sobre ventas con estado:

```text
CLOSED
```

Resultado:

```http
400 Bad Request
```

---

## RN-009 Auditoría Obligatoria

Toda entrega debe registrarse en el historial.

Tabla:

```text
delivery_logs
```

Cada entrega genera un nuevo registro.

---

## RN-010 Consistencia de Empresa

Toda entrega debe pertenecer a la misma empresa que la venta asociada.

---

## RN-011 Cierre Automático

Cuando:

```text
deliveredUnits == totalUnits
```

el sistema debe cambiar automáticamente el estado a:

```text
CLOSED
```

---

# Historial

## RN-012 Historial por Venta

El historial únicamente debe mostrar entregas asociadas a la venta seleccionada.

---

## RN-013 Historial por Empresa

Solo pueden visualizarse entregas pertenecientes a la empresa del usuario autenticado.

---

# QR

## RN-014 Generación de QR

Toda venta puede generar un código QR.

---

## RN-015 Relación QR

Un QR representa una única venta.

```text
1 ComboSale
    |
    1 QR
```

---

## RN-016 Permisos de Generación

Solo los siguientes roles pueden generar QR:

```text
OWNER
MANAGER
CASHIER
```

---

## RN-017 Restricción por Empresa

Solo se pueden generar QR sobre ventas pertenecientes a la empresa del usuario autenticado.

---

# Usuarios y Seguridad

## RN-018 Autenticación Obligatoria

Todos los endpoints de negocio requieren JWT.

Excepciones:

```text
Health Check
Login
```

---

## RN-019 Contraseñas

Las contraseñas nunca deben almacenarse en texto plano.

Deben almacenarse utilizando:

```text
bcrypt
```

---

## RN-020 Contenido del JWT

Todo token debe contener:

```json
{
  "sub": "userId",
  "companyId": "companyId",
  "role": "role",
  "username": "username"
}
```

---

## RN-021 Control por Roles

El sistema utiliza RBAC (Role Based Access Control).

Roles definidos:

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

## RN-022 Matriz de Permisos

| Acción | OWNER | MANAGER | CASHIER | WAITER |
|----------|----------|----------|----------|----------|
| Crear Venta | ✅ | ✅ | ✅ | ❌ |
| Consultar Venta | ✅ | ✅ | ✅ | ✅ |
| Entregar Unidades | ✅ | ✅ | ❌ | ✅ |
| Ver Historial | ✅ | ✅ | ✅ | ✅ |
| Generar QR | ✅ | ✅ | ✅ | ❌ |

---

## RN-023 Fuente de Verdad

La empresa siempre será obtenida desde el JWT.

El backend nunca confiará en datos enviados por el cliente para determinar la empresa propietaria de un recurso.

---

# Arquitectura

## RN-024 Independencia del Dominio

El dominio no debe depender de:

```text
NestJS
TypeORM
Swagger
JWT
PostgreSQL
```

---

## RN-025 Repositorios

Toda interacción con la base de datos debe realizarse mediante repositorios definidos en el dominio e implementados en infraestructura siguiendo arquitectura hexagonal.

---

# Estado Actual

## Sprint A

Completado.

```text
Multiempresa
Company
CompanyId
Migraciones
```

---

## Sprint B

Completado.

```text
Usuarios
Roles
JWT
bcrypt
Guards
Autenticación
```

---

## Sprint C

En progreso.

```text
RolesGuard
Roles Decorator
Permisos por Rol
```


# Gestión de Empresas

## RN-026 Empresa Obligatoria

Toda información operativa del sistema debe pertenecer a una empresa.

No existen registros huérfanos.

Ejemplos:

```text
Usuario
Venta
Entrega
QR
```

deben estar asociados a una empresa.

---

## RN-027 Creación de Empresas

Solo el rol:

```text
SUPER_ADMIN
```

puede crear nuevas empresas.

---

## RN-028 Código Único de Empresa

El código de empresa debe ser único dentro de la plataforma.

Ejemplo:

```text
DEMO_V2
BAR001
BOD001
```

No pueden existir duplicados.

---

## RN-029 Estado de Empresa

Una empresa puede estar:

```text
ACTIVE
INACTIVE
```

o utilizando el modelo actual:

```text
active = true
active = false
```

---

## RN-030 Restricción por Empresa Inactiva

Los usuarios pertenecientes a una empresa inactiva no podrán operar dentro del sistema.

Resultado esperado:

```http
403 Forbidden
```

---

## RN-031 Propiedad de Usuarios

Todo usuario debe pertenecer exactamente a una empresa.

```text
Company
  |
  └── User
```

---

## RN-032 Creación de Usuarios

Los usuarios creados por un OWNER o MANAGER solo pueden pertenecer a su propia empresa.

No pueden crear usuarios en empresas diferentes.

---

## RN-033 Aislamiento de Empresas

No está permitido:

```text
Consultar
Modificar
Eliminar
Generar QR
Registrar Entregas
```

sobre recursos pertenecientes a otra empresa.

---

## RN-034 Administración Global

El rol:

```text
SUPER_ADMIN
```

puede administrar múltiples empresas dentro de la plataforma.

Capacidades:

```text
Crear empresa
Activar empresa
Desactivar empresa
Consultar empresas
Gestionar owners
```

---

## RN-035 Owner por Empresa

Cada empresa debe poseer al menos un usuario con rol:

```text
OWNER
```

responsable de la administración operativa de dicha empresa.

---

## RN-036 Baja de Empresa

Una empresa no podrá eliminarse físicamente si posee:

```text
Usuarios
Ventas
Entregas
Histórico
```

La eliminación será lógica:

```text
active = false
```

---

## RN-037 Auditoría Empresarial

Toda operación crítica deberá quedar asociada a:

```text
companyId
userId
fecha
```

permitiendo trazabilidad futura.

---

## RN-038 Escalabilidad SaaS

La plataforma debe permitir que múltiples empresas operen simultáneamente sobre la misma base de datos utilizando aislamiento mediante:

```text
company_id
```

como estrategia oficial de multiempresa.