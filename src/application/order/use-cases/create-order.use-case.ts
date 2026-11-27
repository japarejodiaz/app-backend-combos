import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { CustomerOrder }
  from '../../../domain/order/entities/customer-order.entity';

import { OrderStatus }
  from '../../../domain/order/enums/order-status.enum';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { CreateOrderDto }
  from '../dto/create-order.dto';

@Injectable()
export class CreateOrderUseCase {

  constructor(

    private readonly orderRepository:
    CustomerOrderRepository,

    private readonly tableRepository:
    DiningTableRepository,

  ) {}

  async execute(
    currentUser: any,
    dto: CreateOrderDto,
  ) {

    if (dto.tableId) {

      const table =
        await this.tableRepository
          .findByCompanyAndId(
            currentUser.companyId,
            dto.tableId,
          );

      if (!table) {

        throw new BadRequestException(
          'Table not found',
        );

      }

      if (!table.active) {

        throw new BadRequestException(
          'Table is inactive',
        );

      }

      const openOrder =
        await this.orderRepository
          .findOpenByTable(
            currentUser.companyId,
            dto.tableId,
          );

      if (openOrder) {

        throw new ConflictException(
          'Table already has an open order',
        );

      }

    }

    const orderNumber =
      await this.orderRepository
        .getNextOrderNumber(
          currentUser.companyId,
        );

    const order =
      new CustomerOrder(

        randomUUID(),

        currentUser.companyId,

        dto.tableId ?? null,

        orderNumber,

        OrderStatus.OPEN,

        currentUser.userId,

        new Date(),

        null,

      );

    return this.orderRepository.create(
      order,
    );

  }

}