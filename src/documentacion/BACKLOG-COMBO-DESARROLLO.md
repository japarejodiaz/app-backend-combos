# BACKLOG DEL PRODUCTO

# Estado Actual del MVP

## Completado

### Multiempresa

- Companies
- company_id
- Aislamiento de datos

---

### Seguridad

- JWT
- Login
- bcrypt
- JwtAuthGuard

---

### Roles

- SUPER_ADMIN
- OWNER
- MANAGER
- CASHIER
- WAITER
- CLIENT

---

### Empresas

- CreateCompany
- GetCompanies
- GetCompanyById
- ActivateCompany
- DeactivateCompany

---

### Usuarios

- CreateUser
- GetUsers
- GetUserById
- UpdateUser
- ActivateUser
- DeactivateUser

---

### Mesas

- CreateTable
- GetTables
- GetTableById
- GetTableByCode
- UpdateTable
- ActivateTable
- DeactivateTable

---

### Comandas

- CreateOrder
- GetOrders
- GetOrderById
- GetOrderByNumber

---

### Ventas de Combos

- CreateComboSale
- DeliverUnits
- GetDeliveries
- GenerateQr

---

# Pendientes Inmediatos MVP

## UC-09 Gestión de Comandas

### UC-09.5 CloseOrder

```http
PATCH /orders/{id}/close
```

Estado:

```text
OPEN
↓
CLOSED
```

---

### UC-09.6 CancelOrder

```http
PATCH /orders/{id}/cancel
```

Estado:

```text
OPEN
↓
CANCELLED
```

---

## UC-10 Integración Comanda + Venta

### UC-10.1 Asociar Venta a Comanda

```http
POST /orders/{id}/combo-sales
```

Objetivo:

```text
Mesa
 ↓
Comanda
 ↓
ComboSale
```

---

### UC-10.2 Consultar Ventas de una Comanda

```http
GET /orders/{id}/combo-sales
```

---

### UC-10.3 Totalizar Comanda

Calcular:

```text
Total Vendido
Total Entregado
Pendiente
```

---

# Sprint Angular Admin

## Autenticación

### FA-01 Login

### FA-02 Logout

### FA-03 Refresh Session

---

## Dashboard

### FA-04 Dashboard Principal

Indicadores:

```text
Mesas Abiertas
Comandas Abiertas
Ventas
Entregas
```

---

## Empresas

### FA-05 CRUD Empresas

---

## Usuarios

### FA-06 CRUD Usuarios

---

## Mesas

### FA-07 CRUD Mesas

---

## Comandas

### FA-08 CRUD Comandas

---

## Ventas

### FA-09 CRUD Ventas

---

## QR

### FA-10 Consulta QR

---

# Sprint Infraestructura

## Deploy

### INF-01 Docker Backend

### INF-02 Docker PostgreSQL

### INF-03 Docker Compose

### INF-04 Variables de Entorno

---

## Nube

### INF-05 VPS Demo

Opciones:

```text
Hetzner
Contabo
DigitalOcean
```

---

### INF-06 Certificado SSL

### INF-07 Dominio Demo

Ejemplo:

```text
demo.tudominio.com
```

---

# Sprint E - Comercialización

## Clientes

### E-01 Customer

Entidad:

```text
Customer
```

Campos:

```text
id
companyId
document
name
phone
email
active
```

---

### E-02 Buscar Cliente

Por:

```text
Documento
Teléfono
Nombre
```

---

## Estado de Pago

### E-03 PaymentStatus

Estados:

```text
PENDING
PARTIAL
PAID
```

---

### E-04 Pagos Parciales

Permitir:

```text
Abonos
```

---

## Reservas

### E-05 Reserva de Consumo

Estados:

```text
RESERVED
```

---

### E-06 Saldo Pendiente

Mostrar:

```text
Comprado
Consumido
Disponible
```

---

## Tickets Digitales

### E-07 ReservationTicket

Generación automática.

---

### E-08 Compartir Ticket

```text
WhatsApp
PDF
Imagen
```

---

## QR Inteligente

### E-09 QR de Estado

Mostrar:

```text
Pagado
Consumido
Disponible
Reservado
```

---

### E-10 Consulta Histórica

Todas las entregas.

---

## Multimoneda

### E-11 Currency

```text
USD
EUR
```

Diseñado para crecer.

---

### E-12 ExchangeRate

Campos:

```text
currency
value
effectiveDate
```

---

### E-13 Tasación

Calcular:

```text
USD
EUR
```

según tasa vigente.

---

## Comandas

### E-14 ReopenOrder

```http
PATCH /orders/{id}/reopen
```

---

#### RN-079

Sólo CLOSED.

---

#### RN-080

CANCELLED no puede reabrirse.

---

#### RN-081

Sólo el mismo día.

---

#### RN-082

No puede existir otra OPEN.

---

#### RN-083

Roles:

```text
OWNER
MANAGER
```

---

# Sprint F - Productos

## Catálogo

### F-01 ProductCategory

Campos:

```text
id
code
name
active
```

---

### F-02 Product

Campos:

```text
id
companyId
categoryId
code
name
price
active
```

---

## Comandas

### F-03 OrderItem

Campos:

```text
id
orderId
productId
quantity
unitPrice
total
```

---

### F-04 Agregar Producto a Comanda

```http
POST /orders/{id}/items
```

---

### F-05 Listar Productos de Comanda

```http
GET /orders/{id}/items
```

---

## Mixto

### F-06 Comanda Mixta

Soportar:

```text
ComboSales
+
Productos
```

Ejemplo:

```text
CMD-000025

Combo VIP
2 Refrescos
1 Agua
4 Empanadas
```

---

## Reportes

### F-07 Ventas por Producto

### F-08 Productos Más Vendidos

### F-09 Consumo por Mesa

---

# Sprint G - Inventario

## Inventario

### G-01 Stock

### G-02 Movimientos

### G-03 Entradas

### G-04 Salidas

### G-05 Ajustes

---

## Integración

### G-06 Descuento Automático

Al vender:

```text
Producto
```

---

### G-07 Alertas

```text
Stock Bajo
Sin Existencia
```

---

# Sprint H - Reportería

## Reportes Operativos

### H-01 Ventas Diarias

### H-02 Comandas por Mesa

### H-03 Consumo por Cliente

### H-04 Entregas

---

## Reportes Financieros

### H-05 Caja Diaria

### H-06 Ingresos por Moneda

### H-07 Ingresos por Empresa

### H-08 Top Clientes

---

# Visión Final

```text
Mesa
   ↓
Comanda
   ↓
 ┌───────────────┐
 │ ComboSales    │
 │ Productos     │
 └───────────────┘
   ↓
Pagos
   ↓
Reservas
   ↓
QR Inteligente
   ↓
Reportes
```