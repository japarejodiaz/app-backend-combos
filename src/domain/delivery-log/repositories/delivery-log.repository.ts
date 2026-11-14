import { DeliveryLog } from '../entities/delivery-log.entity';

export abstract class DeliveryLogRepository {

  abstract create(
    log: DeliveryLog,
  ): Promise<DeliveryLog>;

  abstract findByComboSaleId(
    comboSaleId: string,
  ): Promise<DeliveryLog[]>;

  abstract findByCompanyAndComboSaleId(
    companyId: string,
    comboSaleId: string,
  ): Promise<DeliveryLog[]>;

}