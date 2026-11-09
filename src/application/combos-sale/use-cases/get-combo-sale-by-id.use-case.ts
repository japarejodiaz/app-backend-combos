import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ComboSaleRepository }
  from '../../../domain/combo-sale/repositories/combo-sale.repository';

@Injectable()
export class GetComboSaleByIdUseCase {

  constructor(
    private readonly repository:
    ComboSaleRepository,
  ) {}

  async execute(id: string) {

    const comboSale =
      await this.repository.findById(id);

    if (!comboSale) {
      throw new NotFoundException(
        `ComboSale ${id} no encontrado`,
      );
    }

    return {
      id: comboSale.id,
      comboId: comboSale.comboId,
      totalUnits: comboSale.totalUnits,
      deliveredUnits: comboSale.deliveredUnits,

      pendingUnits:
        comboSale.totalUnits -
        comboSale.deliveredUnits,

      status: comboSale.status,
    };
  }
}