import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateComboSaleDto }
  from '../../combos-sale/dto/create-combo-sale.dto';

import { CreateComboSaleUseCase }
  from '../../combos-sale/use-cases/create-combo-sale.use-case';

import { OrderStatus }
  from '../../../domain/order/enums/order-status.enum';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

@Injectable()
export class CreateOrderComboSaleUseCase {

  constructor(

    private readonly orderRepository:
    CustomerOrderRepository,

    private readonly createComboSaleUseCase:
    CreateComboSaleUseCase,

  ) {}

  async execute(
    currentUser: any,
    orderId: string,
    dto: CreateComboSaleDto,
  ) {

    const order =
      await this.orderRepository
        .findByCompanyAndId(
          currentUser.companyId,
          orderId,
        );

    if (!order) {

      throw new NotFoundException(
        'Order not found',
      );

    }

    if (
      order.status !==
      OrderStatus.OPEN
    ) {

      throw new ConflictException(
        'Order is not open',
      );

    }

    return this.createComboSaleUseCase
      .execute(
        currentUser.companyId,
        dto,
        order.id,
      );

  }

}