import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetOrderByIdUseCase {

  constructor(
    private readonly repository:
    CustomerOrderRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
  ) {

    const order =
      currentUser.role ===
      UserRole.SUPER_ADMIN

        ? await this.repository.findById(
          id,
        )

        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!order) {

      throw new NotFoundException(
        'Order not found',
      );

    }

    return order;

  }

}