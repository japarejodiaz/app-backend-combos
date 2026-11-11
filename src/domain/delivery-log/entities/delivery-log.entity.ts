export class DeliveryLog {

  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly comboSaleId: string,
    public readonly units: number,
    public readonly createdAt: Date,
  ) {}

}