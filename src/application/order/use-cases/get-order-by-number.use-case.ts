import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetOrderByNumberUseCase {

  constructor(
    private readonly repository:
    CustomerOrderRepository,
  ) {}

  async execute(
    currentUser: any,
    orderNumber: string,
  ) {

    let order;

    if (
      currentUser.role ===
      UserRole.SUPER_ADMIN
    ) {

      const orders =
        await this.repository.findAll();

      order =
        orders.find(
          o =>
            o.orderNumber ===
            orderNumber,
        ) ?? null;

    } else {

      order =
        await this.repository
          .findByCompanyAndNumber(
            currentUser.companyId,
            orderNumber,
          );

    }

    if (!order) {

      throw new NotFoundException(
        'Order not found',
      );

    }

    return order;

  }

}