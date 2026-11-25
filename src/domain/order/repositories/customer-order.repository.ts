import { CustomerOrder }
  from '../entities/customer-order.entity';

export abstract class CustomerOrderRepository {

  abstract create(
    order: CustomerOrder,
  ): Promise<CustomerOrder>;

  abstract findById(
    id: string,
  ): Promise<CustomerOrder | null>;

  abstract findByCompanyId(
    companyId: string,
  ): Promise<CustomerOrder[]>;

  abstract update(
    order: CustomerOrder,
  ): Promise<CustomerOrder>;

}