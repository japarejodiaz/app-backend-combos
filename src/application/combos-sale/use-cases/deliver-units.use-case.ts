import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ComboSaleRepository } from '../../../domain/combo-sale/repositories/combo-sale.repository';
import { ComboSaleStatus } from '../../../domain/combo-sale/enums/combo-sale-status.enum';

import { randomUUID } from 'crypto';
import { DeliveryLog } from '../../../domain/delivery-log/entities/delivery-log.entity';
import { DeliveryLogRepository } from '../../../domain/delivery-log/repositories/delivery-log.repository';

@Injectable()
export class DeliverUnitsUseCase {
  constructor(
    private readonly repository: ComboSaleRepository,
    private readonly deliveryRepository: DeliveryLogRepository,
  ) {}

  async execute(companyId: string, id: string, units: number) {
    const comboSale = await this.repository.findByCompanyAndId(companyId, id);

    if (!comboSale) {
      throw new NotFoundException('ComboSale not found');
    }

    if (comboSale.status === ComboSaleStatus.CLOSED) {
      throw new BadRequestException('Combo is closed');
    }

    const newDelivered = comboSale.deliveredUnits + units;

    if (newDelivered > comboSale.totalUnits) {
      throw new BadRequestException('Delivery exceeds remaining units');
    }

    comboSale.deliveredUnits = newDelivered;

    if (comboSale.deliveredUnits === comboSale.totalUnits) {
      comboSale.status = ComboSaleStatus.CLOSED;
    }

    await this.repository.update(comboSale);

    await this.deliveryRepository.create(
      new DeliveryLog(
        randomUUID(),
        comboSale.companyId,
        comboSale.id,
        units,
        new Date(),
      ),
    );

    return {
      id: comboSale.id,
      comboId: comboSale.comboId,
      totalUnits: comboSale.totalUnits,
      deliveredUnits: comboSale.deliveredUnits,
      pendingUnits: comboSale.totalUnits - comboSale.deliveredUnits,
      status: comboSale.status,
    };
  }
}
