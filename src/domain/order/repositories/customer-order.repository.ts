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

  abstract findOpenByTable(
    companyId: string,
    tableId: string,
  ): Promise<CustomerOrder | null>;

  abstract getNextOrderNumber(
    companyId: string,
  ): Promise<string>;

  abstract findAll():
    Promise<CustomerOrder[]>


  abstract findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<CustomerOrder | null>;

  abstract findByCompanyAndNumber(
    companyId: string,
    orderNumber: string,
  ): Promise<CustomerOrder | null>;



}