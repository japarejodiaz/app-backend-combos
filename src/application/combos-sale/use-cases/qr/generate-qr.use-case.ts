import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ComboSaleRepository }
  from '../../../../domain/combo-sale/repositories/combo-sale.repository';

import { QrGeneratorService }
  from '../../../../infrastructure/qr/qr-generator.service';

@Injectable()
export class GenerateQrUseCase {

  constructor(
    private readonly repository:
    ComboSaleRepository,

    private readonly qrGenerator:
    QrGeneratorService,
  ) {}

  async execute(
    companyId: string,
    comboSaleId: string,
  ) {

    const comboSale =
      await this.repository.findByCompanyAndId(
        companyId,
        comboSaleId,
      );

    if (!comboSale) {
      throw new NotFoundException(
        'ComboSale not found',
      );
    }

    const url =
      `https://localhost:3000/public/combo-sales/${comboSale.id}`;

    const qr =
      await this.qrGenerator.generate(
        url,
      );

    return {
      comboSaleId: comboSale.id,
      url,
      qr,
    };

  }
}
