import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DeliveryLogRepository } from '../../../../domain/delivery-log/repositories/delivery-log.repository';
import { DeliveryLog } from '../../../../domain/delivery-log/entities/delivery-log.entity';

import { DeliveryLogOrmEntity } from '../entities/delivery-log.orm-entity';

@Injectable()
export class DeliveryLogPostgresRepository
  implements DeliveryLogRepository
{
  constructor(
    @InjectRepository(DeliveryLogOrmEntity)
    private readonly repository: Repository<DeliveryLogOrmEntity>,
  ) {}

  async create(
    log: DeliveryLog,
  ): Promise<DeliveryLog> {

    const entity = this.repository.create({
      id: log.id,
      companyId: log.companyId,
      comboSaleId: log.comboSaleId,
      units: log.units,
      createdAt: log.createdAt,
    });

    await this.repository.save(entity);

    return log;
  }

  async findByComboSaleId(
    comboSaleId: string,
  ): Promise<DeliveryLog[]> {

    const entities = await this.repository.find({
      where: { comboSaleId },
      order: {
        createdAt: 'DESC',
      },
    });

    return entities.map(
      entity =>
        new DeliveryLog(
          entity.id,
          entity.companyId,
          entity.comboSaleId,
          entity.units,
          entity.createdAt,
        ),
    );
  }
}
