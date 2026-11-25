# Reglas de Negocio

# Módulo: Multiempresa

## UC-00 Gestión Multiempresa

### RN-001 Multiempresa

Toda operación del sistema debe ejecutarse dentro del contexto de una empresa.

La empresa nunca debe ser enviada desde el cliente.

La empresa se obtiene desde:

```text
JWT
 ↓
companyId
```

---

### RN-002 Aislamiento de Datos

Un usuario únicamente puede acceder a información perteneciente a su empresa.

Si el recurso pertenece a otra empresa:

```http
404 Not Found
```

---

### RN-003 Fuente de Verdad

El backend nunca confiará en el `companyId` enviado por el cliente.

---

# Módulo: Ventas de Combos

## UC-01 CreateComboSale

### RN-004 Estado Inicial

Toda venta inicia con estado:

```text
OPEN
```

---

### RN-005 Unidades Iniciales

Toda venta inicia con:

```text
deliveredUnits = 0
```

---

### RN-006 Propiedad

Toda venta pertenece a una única empresa.

---

### RN-007 Venta Directa

Una venta directa se identifica por:

```text
order_id = NULL
```

---

## UC-02 GetComboSaleById

### RN-008 Restricción por Empresa

Sólo puede consultarse una venta de la empresa del usuario autenticado.

---

## UC-03 DeliverUnits

### RN-009 No Sobre Entregar

No se pueden entregar más unidades de las adquiridas.

---

### RN-010 No Entregar Ventas Cerradas

No se pueden registrar entregas en ventas:

```text
CLOSED
```

---

### RN-011 Auditoría

Toda entrega genera un registro en:

```text
delivery_logs
```

---

### RN-012 Cierre Automático

Cuando:

```text
deliveredUnits == totalUnits
```

la venta pasa automáticamente a:

```text
CLOSED
```

---

## UC-04 GetDeliveries

### RN-013 Historial por Venta

El historial debe mostrar únicamente entregas asociadas a la venta seleccionada.

---

### RN-014 Historial por Empresa

No pueden visualizarse entregas pertenecientes a otras empresas.

---

## UC-05 GenerateQr

### RN-015 Generación de QR

Toda venta puede poseer un QR.

---

### RN-016 Relación QR

Un QR representa una única venta.

```text
1 ComboSale
    |
    1 QR
```

---

### RN-017 Restricción por Empresa

Sólo puede generarse QR para ventas de la empresa autenticada.

---

# Módulo: Seguridad

## UC-Auth Login

### RN-018 JWT Obligatorio

Todos los endpoints de negocio requieren autenticación.

Excepciones:

```text
Health
Login
```

---

### RN-019 Contraseñas

Las contraseñas deben almacenarse utilizando:

```text
bcrypt
```

---

### RN-020 JWT

Todo token debe contener:

```json
{
  "sub": "",
  "companyId": "",
  "role": "",
  "username": ""
}
```

---

### RN-021 Usuario Inactivo

Un usuario inactivo no puede iniciar sesión.

Resultado:

```http
401 Unauthorized
```

---

### RN-022 Empresa Inactiva

Una empresa inactiva no puede operar en el sistema.

Resultado esperado:

```http
403 Forbidden
```

---

# Módulo: Roles

## UC-Roles

### RN-023 Roles Definidos

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

### RN-024 SUPER_ADMIN

Administra la plataforma completa.

Puede:

```text
Empresas
Usuarios
Configuración
Reportes Globales
```

---

### RN-025 OWNER

Administra su empresa.

Puede:

```text
Usuarios
Ventas
QR
Reportes
```

---

# Módulo: Empresas

## UC-06.1 CreateCompany

### RN-026 Creación de Empresas

Sólo:

```text
SUPER_ADMIN
```

puede crear empresas.

---

### RN-027 Código Único

El código de empresa debe ser único.

Resultado:

```http
409 Conflict
```

---

## UC-06.2 GetCompanies

### RN-028 Consulta Global

Sólo SUPER_ADMIN puede listar empresas.

---

## UC-06.3 GetCompanyById

### RN-029 Consulta Individual

Sólo SUPER_ADMIN puede consultar una empresa específica.

---

## UC-06.4 DeactivateCompany

### RN-030 Desactivación Lógica

La desactivación se realiza mediante:

```text
active = false
```

---

### RN-031 Conservación del Histórico

La empresa conserva:

```text
Usuarios
Ventas
Entregas
Históricos
```

---

## UC-06.5 ActivateCompany

### RN-032 Reactivación

La activación se realiza mediante:

```text
active = true
```

---

# Módulo: Usuarios

## UC-07.1 CreateUser

### RN-033 Empresa Heredada

La empresa del usuario será obtenida del JWT.

No se recibe desde el body.

---

### RN-034 Username Único

El username debe ser único.

Resultado:

```http
409 Conflict
```

---

### RN-035 Email Único

El email debe ser único.

Resultado:

```http
409 Conflict
```

---

### RN-036 OWNER Puede Crear

```text
MANAGER
CASHIER
WAITER
CLIENT
```

---

### RN-037 OWNER No Puede Crear

```text
OWNER
SUPER_ADMIN
```

Resultado:

```http
403 Forbidden
```

---

### RN-038 SUPER_ADMIN Puede Crear

```text
SUPER_ADMIN
OWNER
MANAGER
CASHIER
WAITER
CLIENT
```

---

## UC-07.2 GetUsers

### RN-039 SUPER_ADMIN

Puede consultar todos los usuarios.

---

### RN-040 OWNER

Sólo puede consultar usuarios de su empresa.

---

### RN-041 MANAGER

Sólo puede consultar usuarios de su empresa.

---

### RN-042 Restricción de Consulta

Los roles:

```text
CASHIER
WAITER
CLIENT
```

no pueden consultar usuarios.

---

## UC-07.3 GetUserById

### RN-043 Consulta Individual

Sólo puede consultarse un usuario perteneciente a la misma empresa.

---

## UC-07.4 UpdateUser

### RN-044 Campos Editables

Pueden modificarse:

```text
username
email
role
```

---

### RN-045 Campos Protegidos

No pueden modificarse:

```text
id
companyId
password
active
```

---

### RN-046 Restricción de Roles

OWNER no puede asignar:

```text
OWNER
SUPER_ADMIN
```

---

### RN-047 Restricción por Empresa

No pueden actualizarse usuarios de otras empresas.

---

## UC-07.5 DeactivateUser

### RN-048 Desactivación Lógica

La desactivación se realiza mediante:

```text
active = false
```

---

### RN-049 Auto Desactivación

Un usuario no puede desactivarse a sí mismo.

Resultado:

```http
403 Forbidden
```

---

### RN-050 Restricción sobre SUPER_ADMIN

OWNER no puede desactivar SUPER_ADMIN.

---

## UC-07.6 ActivateUser

### RN-051 Reactivación

La activación se realiza mediante:

```text
active = true
```

---

### RN-052 Restricción sobre SUPER_ADMIN

OWNER no puede activar SUPER_ADMIN.

---

# Módulo: Mesas

## UC-08 Gestión de Mesas

### RN-053 Propiedad

Toda mesa pertenece a una única empresa.

---

### RN-054 Código de Mesa

El código debe ser único por empresa.

```text
UNIQUE(company_id, code)
```

---

### RN-055 Capacidad

Toda mesa debe poseer capacidad máxima.

Ejemplo:

```text
2
4
6
8
10
```

---

# Módulo: Comandas

## UC-09 Gestión de Comandas

### RN-056 Propiedad

Toda comanda pertenece a una empresa.

---

### RN-057 Mesa Opcional

Una comanda puede o no estar asociada a una mesa.

```text
table_id NULL
```

---

### RN-058 Apertura

Toda comanda registra:

```text
openedBy
openedAt
```

---

### RN-059 Estados

Estados válidos:

```text
OPEN
CLOSED
CANCELLED
```

---

### RN-060 Comanda Cerrada

Una comanda cerrada no puede recibir nuevas ventas.

---

### RN-061 Comanda Cancelada

Una comanda cancelada no puede modificarse.

---

### RN-062 Numeración

La numeración debe ser única por empresa.

```text
UNIQUE(company_id, order_number)
```

---

# Módulo: Compatibilidad Operativa

## UC-10 Modelo Híbrido

### RN-063 Venta Directa

```text
ComboSale
|
└── order_id = NULL
```

---

### RN-064 Venta por Comanda

```text
DiningTable
     ↓
CustomerOrder
     ↓
ComboSale
```

---

### RN-065 Núcleo del Negocio

La entidad principal del dominio es:

```text
ComboSale
```

---

### RN-066 Compatibilidad

La incorporación de Mesas y Comandas no debe afectar:

```text
QR
Entregas
Historial
Auditoría
JWT
Roles
Multiempresa
```