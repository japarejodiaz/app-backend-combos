import { Module } from '@nestjs/common';

import { TypeOrmModule }
  from '@nestjs/typeorm';

import { OrderController }
  from './order.controller';

import { CustomerOrderOrmEntity }
  from '../../../infrastructure/persistence/postgres/entities/customer-order.orm-entity';

import { CreateOrderUseCase }
  from '../../../application/order/use-cases/create-order.use-case';

import { GetOrdersUseCase }
  from '../../../application/order/use-cases/get-orders.use-case';

import { GetOrderByNumberUseCase }
  from '../../../application/order/use-cases/get-order-by-number.use-case';

import { GetOrderByIdUseCase }
  from '../../../application/order/use-cases/get-order-by-id.use-case';

import { CloseOrderUseCase }
  from '../../../application/order/use-cases/close-order.use-case';

import { CancelOrderUseCase }
  from '../../../application/order/use-cases/cancel-order.use-case';
import { CreateOrderComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-order-combo-sale.use-case';

import { CreateComboSaleUseCase } from '../../../application/combos-sale/use-cases/create-combo-sale.use-case';

import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';

import { PostgresComboSaleRepository } from '../../../infrastructure/persistence/postgres/repositories/combo-sale.postgres.repository';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { PostgresCustomerOrderRepository }
  from '../../../infrastructure/persistence/postgres/repositories/customer-order.postgres.repository';

import { PostgresDiningTableRepository }
  from '../../../infrastructure/persistence/postgres/repositories/dining-table.postgres.repository';

import { DiningTableOrmEntity }
  from '../../../infrastructure/persistence/postgres/entities/dining-table.orm-entity'
import { ComboSaleOrmEntity } from '../../../infrastructure/persistence/postgres/entities/combo-sale.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerOrderOrmEntity,
      DiningTableOrmEntity,
      ComboSaleOrmEntity,
    ]),
  ],

  controllers: [
    OrderController,
  ],

  providers: [

    CreateOrderUseCase,
    GetOrdersUseCase,
    GetOrderByNumberUseCase,
    GetOrderByIdUseCase,
    CreateOrderComboSaleUseCase,
    CloseOrderUseCase,
    CancelOrderUseCase,
    CreateComboSaleUseCase,

    {
      provide:
      CustomerOrderRepository,

      useClass:
      PostgresCustomerOrderRepository,
    },

    {
      provide:
      DiningTableRepository,

      useClass:
      PostgresDiningTableRepository,
    },
    {
      provide:
      ComboSaleRepository,

      useClass:
      PostgresComboSaleRepository,
    }

  ],

})
export class OrderModule {}