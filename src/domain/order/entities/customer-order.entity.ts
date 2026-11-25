import { OrderStatus }
  from '../enums/order-status.enum';

export class CustomerOrder {

  constructor(

    public readonly id: string,

    public readonly companyId: string,

    public readonly tableId: string | null,

    public readonly orderNumber: number,

    public status: OrderStatus,

    public readonly openedBy: string,

    public readonly openedAt: Date,

    public closedAt: Date | null,

  ) {}

}