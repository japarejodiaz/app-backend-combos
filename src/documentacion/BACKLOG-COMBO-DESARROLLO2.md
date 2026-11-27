# PRODUCT BACKLOG

# Sprint MVP-01
## Backend Operativo + Demo Comercial

### Objetivo

Disponer de un backend completamente funcional para:

```text
Empresas
Usuarios
Mesas
Comandas
Ventas
QR
```

y comenzar el Frontend Administrativo.

---

## Estado

### Completado

#### Empresas

- CreateCompany
- GetCompanies
- GetCompanyById
- ActivateCompany
- DeactivateCompany

##### Criterios de aceptación

✅ Sólo SUPER_ADMIN administra empresas

✅ Multiempresa funcional

✅ Activación y desactivación lógica

---

#### Usuarios

- CreateUser
- GetUsers
- GetUserById
- UpdateUser
- ActivateUser
- DeactivateUser

##### Criterios de aceptación

✅ Roles funcionales

✅ JWT funcional

✅ Aislamiento por empresa

✅ Login validado

---

#### Mesas

- CreateTable
- GetTables
- GetTableById
- GetTableByCode
- UpdateTable
- ActivateTable
- DeactivateTable

##### Criterios de aceptación

✅ Código único por empresa

✅ Sólo OWNER/MANAGER administran

✅ Consulta por UUID

✅ Consulta por Código

---

#### Comandas

- CreateOrder
- GetOrders
- GetOrderById
- GetOrderByNumber

##### Criterios de aceptación

✅ Generación:

```text
CMD-000001
```

✅ Sólo una comanda OPEN por mesa

✅ Relación mesa-comanda funcional

✅ Multiempresa funcional

---

## Pendientes

### UC-09.5 CloseOrder

```http
PATCH /orders/{id}/close
```

##### Criterios de aceptación

✅ Sólo OPEN puede cerrarse

✅ Cambia a CLOSED

✅ Registra closedAt

✅ No permite cerrar dos veces

---

### UC-09.6 CancelOrder

```http
PATCH /orders/{id}/cancel
```

##### Criterios de aceptación

✅ Sólo OPEN puede cancelarse

✅ Cambia a CANCELLED

✅ No permite cancelar CLOSED

✅ No permite cancelar dos veces

---

### UC-10 Integración Comandas y Ventas

#### UC-10.1 Asociar Venta a Comanda

```http
POST /orders/{id}/combo-sales
```

##### Criterios de aceptación

✅ order_id asignado

✅ Venta asociada a la comanda

✅ Mantiene QR

✅ Mantiene entregas

---

#### UC-10.2 Ventas por Comanda

```http
GET /orders/{id}/combo-sales
```

##### Criterios de aceptación

✅ Lista todas las ventas

✅ Totaliza consumos

✅ Respeta empresa

---

# Sprint MVP-02
## Frontend Administrativo Angular

### Objetivo

Demostrar operación completa.

---

## Autenticación

### FA-01 Login

##### Criterios de aceptación

✅ JWT almacenado

✅ Protección de rutas

✅ Logout funcional

---

## Dashboard

### FA-02 Dashboard

##### Criterios de aceptación

✅ Mesas abiertas

✅ Comandas abiertas

✅ Ventas activas

✅ Entregas pendientes

---

## Empresas

### FA-03 Gestión Empresas

##### Criterios de aceptación

✅ CRUD completo

---

## Usuarios

### FA-04 Gestión Usuarios

##### Criterios de aceptación

✅ CRUD completo

---

## Mesas

### FA-05 Gestión Mesas

##### Criterios de aceptación

✅ CRUD completo

✅ Activar

✅ Desactivar

---

## Comandas

### FA-06 Gestión Comandas

##### Criterios de aceptación

✅ Abrir

✅ Consultar

✅ Cerrar

✅ Cancelar

---

## Ventas

### FA-07 Gestión Ventas

##### Criterios de aceptación

✅ Crear venta

✅ Entregar unidades

✅ Consultar historial

---

## QR

### FA-08 Consulta QR

##### Criterios de aceptación

✅ Visualizar estado

✅ Historial

✅ Entregas

---

# Sprint MVP-03
## Deploy y Demo Comercial

### Objetivo

Sistema público para demostraciones.

---

### Dockerización

#### INF-01 Docker Backend

#### INF-02 Docker PostgreSQL

#### INF-03 Docker Compose

##### Criterios de aceptación

✅ Levanta localmente con:

```bash
docker compose up
```

---

### Cloud

#### INF-04 VPS

##### Criterios de aceptación

✅ Backend publicado

✅ PostgreSQL persistente

---

#### INF-05 SSL

##### Criterios de aceptación

✅ HTTPS funcional

---

#### INF-06 Demo

##### Criterios de aceptación

✅ Empresa demo

✅ Usuarios demo

✅ Mesas demo

✅ Comandas demo

---

# Sprint E
## Comercialización y Fidelización

### Objetivo

Convertir el sistema en una plataforma de control de consumo.

---

## Clientes

### E-01 Customer

##### Criterios de aceptación

✅ Buscar por:

```text
Documento
Teléfono
Nombre
```

✅ Historial de consumos

✅ Historial de reservas

---

## Pagos

### E-02 PaymentStatus

Estados:

```text
PENDING
PARTIAL
PAID
```

##### Criterios de aceptación

✅ Pago separado del consumo

✅ Pago parcial permitido

---

## Reservas

### E-03 Reserva de Consumo

##### Criterios de aceptación

✅ Mostrar saldo pendiente

✅ Mostrar saldo consumido

✅ Mostrar saldo disponible

---

## Tickets

### E-04 ReservationTicket

##### Criterios de aceptación

✅ Ticket automático

✅ Ticket digital

✅ Vinculado al cliente

---

## QR Inteligente

### E-05 Estado Avanzado

##### Criterios de aceptación

Mostrar:

```text
Pagado
Consumido
Disponible
Reservado
```

---

## Monedas

### E-06 Currency

```text
USD
EUR
```

---

### E-07 ExchangeRate

##### Criterios de aceptación

✅ Manejo de tasas

✅ Histórico de tasas

✅ Cambio por fecha

---

## Comandas

### E-08 ReopenOrder

```http
PATCH /orders/{id}/reopen
```

##### Criterios de aceptación

✅ Sólo CLOSED

✅ Sólo mismo día

✅ No existe otra OPEN

✅ OWNER/MANAGER

✅ Auditoría completa

---

# Sprint F
## Productos y Punto de Venta

### Objetivo

Permitir productos además de combos.

---

## Catálogo

### F-01 ProductCategory

##### Criterios de aceptación

✅ Categorías administrables

---

### F-02 Product

##### Criterios de aceptación

✅ Precio

✅ Código

✅ Estado activo

---

## Comandas Mixtas

### F-03 OrderItem

##### Criterios de aceptación

✅ Producto asociado a comanda

✅ Cantidad

✅ Precio unitario

✅ Total

---

### F-04 Agregar Producto

```http
POST /orders/{id}/items
```

##### Criterios de aceptación

✅ Agrega productos

✅ Totaliza comanda

---

### F-05 Comanda Mixta

##### Criterios de aceptación

Permite:

```text
ComboSales
+
Productos
```

Ejemplo:

```text
CMD-000025

Combo 10 Cervezas

2 Refrescos

1 Agua

4 Empanadas
```

---

## Reportes Comerciales

### F-06 Productos Más Vendidos

### F-07 Ventas Por Categoría

### F-08 Consumo Por Mesa

---

# Sprint G
## Inventario

### G-01 Stock

### G-02 Entradas

### G-03 Salidas

### G-04 Ajustes

### G-05 Alertas

##### Criterios de aceptación

✅ Stock en tiempo real

✅ Alerta de mínimos

✅ Movimientos auditados

---

# Sprint H
## Inteligencia Comercial y Reportería

### H-01 Ventas Diarias

### H-02 Caja Diaria

### H-03 Consumo por Cliente

### H-04 Top Clientes

### H-05 Top Productos

### H-06 Ingresos por Moneda

### H-07 Ingresos por Empresa

##### Criterios de aceptación

✅ Exportación

✅ Filtros por fecha

✅ Dashboard ejecutivo

✅ Indicadores comerciales