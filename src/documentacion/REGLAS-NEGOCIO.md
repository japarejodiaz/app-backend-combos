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


# Gestión de Usuarios

## RN-039 Creación de Usuarios

Solo usuarios autorizados podrán crear usuarios.

Roles permitidos:

```text
SUPER_ADMIN
OWNER
```

---

## RN-040 Empresa Heredada

La empresa del nuevo usuario nunca será enviada por el cliente.

La empresa se obtiene automáticamente desde:

```text
JWT
 ↓
CurrentUser
 ↓
companyId
```

---

## RN-041 Username Único

El username debe ser único dentro de toda la plataforma.

No pueden existir dos usuarios con el mismo username.

Resultado esperado:

```http
409 Conflict
```

---

## RN-042 Email Único

El email debe ser único dentro de toda la plataforma.

Resultado esperado:

```http
409 Conflict
```

---

## RN-043 Contraseñas

Las contraseñas no se almacenan en texto plano.

Todas las contraseñas se almacenan utilizando:

```text
bcrypt
```

---

## RN-044 Jerarquía de Roles

Un OWNER puede crear:

```text
MANAGER
CASHIER
WAITER
CLIENT
```

---

## RN-045 Restricción de OWNER

Un OWNER no puede crear:

```text
OWNER
SUPER_ADMIN
```

Resultado esperado:

```http
403 Forbidden
```

---

## RN-046 Autoridad de SUPER_ADMIN

SUPER_ADMIN puede crear cualquier tipo de usuario.

Roles permitidos:

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

# Consulta de Usuarios

## RN-047 Consulta Global

SUPER_ADMIN puede consultar todos los usuarios de la plataforma.

---

## RN-048 Consulta por Empresa

OWNER y MANAGER solo pueden consultar usuarios de su propia empresa.

---

## RN-049 Aislamiento Multiempresa

No se permite consultar usuarios pertenecientes a otra empresa.

Resultado esperado:

```http
404 Not Found
```

---

## RN-050 Restricción de Consulta

Los roles:

```text
CASHIER
WAITER
CLIENT
```

no pueden consultar usuarios.

Resultado esperado:

```http
403 Forbidden
```

---

# Actualización de Usuarios

## RN-051 Campos Editables

Los siguientes campos pueden ser modificados:

```text
username
email
role
```

---

## RN-052 Campos Protegidos

No pueden modificarse mediante UpdateUser:

```text
id
companyId
password
active
```

---

## RN-053 Restricción de Roles

Un OWNER no puede promover usuarios a:

```text
OWNER
SUPER_ADMIN
```

Resultado esperado:

```http
403 Forbidden
```

---

## RN-054 Actualización Multiempresa

Un usuario solo puede actualizar usuarios pertenecientes a su empresa.

Resultado esperado:

```http
404 Not Found
```

---

# Activación y Desactivación

## RN-055 Desactivación Lógica

La desactivación de usuarios es lógica.

Se implementa mediante:

```text
active = false
```

---

## RN-056 Conservación del Histórico

Desactivar un usuario no elimina:

```text
Ventas
Entregas
Auditoría
Historial
```

---

## RN-057 Usuario Inactivo

Un usuario inactivo no puede iniciar sesión.

Resultado esperado:

```http
401 Unauthorized
```

---

## RN-058 Reactivación

La reactivación se realiza mediante:

```text
active = true
```

---

## RN-059 Auto Desactivación

Un usuario no puede desactivar su propia cuenta.

Resultado esperado:

```http
403 Forbidden
```

---

## RN-060 Restricción sobre SUPER_ADMIN

Un OWNER no puede activar ni desactivar usuarios con rol:

```text
SUPER_ADMIN
```

Resultado esperado:

```http
403 Forbidden
```

---

# Gestión de Mesas

## RN-061 Mesa

Una mesa pertenece a una única empresa.

```text
Company
  |
  └── DiningTable
```

---

## RN-062 Código de Mesa

El código de mesa debe ser único dentro de una empresa.

Ejemplo:

```text
M01
M02
M03
```

Restricción:

```text
UNIQUE(company_id, code)
```

---

## RN-063 Capacidad

Toda mesa debe definir una capacidad máxima.

Ejemplo:

```text
2
4
6
8
10
```

personas.

---

# Gestión de Comandas

## RN-064 Comanda

Una comanda pertenece a una única empresa.

---

## RN-065 Mesa Opcional

Una comanda puede estar asociada a una mesa.

```text
table_id
```

puede ser:

```text
NULL
```

---

## RN-066 Venta Directa

Cuando:

```text
order_id = NULL
```

la venta corresponde a una venta directa.

Ejemplos:

```text
Bodegón
Licorería
Delivery
```

---

## RN-067 Venta por Comanda

Cuando:

```text
order_id != NULL
```

la venta pertenece a una comanda.

---

## RN-068 Apertura de Comanda

Toda comanda debe registrar:

```text
openedBy
openedAt
```

---

## RN-069 Estado de Comanda

Estados permitidos:

```text
OPEN
CLOSED
CANCELLED
```

---

## RN-070 Comanda Cerrada

Una comanda cerrada no puede recibir nuevas ventas.

---

## RN-071 Comanda Cancelada

Una comanda cancelada no puede ser modificada.

---

## RN-072 Numeración de Comandas

Toda empresa debe tener numeración única de comandas.

Restricción:

```text
UNIQUE(company_id, order_number)
```

---

# Compatibilidad Operativa

## RN-073 Modalidad Híbrida

La plataforma soporta simultáneamente:

### Venta Directa

```text
ComboSale
  |
  └── order_id = NULL
```

---

### Mesa + Comanda

```text
DiningTable
     ↓
CustomerOrder
     ↓
ComboSale
```

---

## RN-074 Compatibilidad Retroactiva

La incorporación de Mesas y Comandas no debe afectar:

```text
QR
Entregas
Historial
Auditoría
Multiempresa
Seguridad
JWT
Roles
```

---

## RN-075 Núcleo del Negocio

La entidad principal del dominio continúa siendo:

```text
ComboSale
```

Todas las entregas, auditorías y QR permanecen asociados a ComboSale independientemente de que provengan de:

```text
Venta Directa
o
Comanda
```