import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';
import { DeliveryLogRepository }
  from '../../../domain/delivery-log/repositories/delivery-log.repository';

@Injectable()
export class GetDeliveriesByComboSaleUseCase {

  constructor(
    private readonly comboRepository:
    ComboSaleRepository,

    private readonly deliveryRepository:
    DeliveryLogRepository,
  ) {}

  async execute(
    companyId: string,
    comboSaleId: string,
  ) {

    const combo =
      await this.comboRepository.findByCompanyAndId(
        companyId,
        comboSaleId,
      );

    if (!combo) {
      throw new NotFoundException(
        'ComboSale not found',
      );
    }

    return this.deliveryRepository
      .findByComboSaleId(
        comboSaleId,
      );
  }
}