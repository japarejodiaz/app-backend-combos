import {
  Injectable,
} from '@nestjs/common';

import { CustomerOrderRepository }
  from '../../../domain/order/repositories/customer-order.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetOrdersUseCase {

  constructor(
    private readonly repository:
    CustomerOrderRepository,
  ) {}

  async execute(
    currentUser: any,
  ) {

    if (
      currentUser.role ===
      UserRole.SUPER_ADMIN
    ) {

      return this.repository.findAll();

    }

    return this.repository.findByCompanyId(
      currentUser.companyId,
    );

  }

}