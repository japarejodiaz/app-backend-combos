import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DeliveryLogRepository } from '../../../../domain/delivery-log/repositories/delivery-log.repository';
import { DeliveryLog } from '../../../../domain/delivery-log/entities/delivery-log.entity';

import { DeliveryLogOrmEntity } from '../entities/delivery-log.orm-entity';
/**
 * Postgres implementation of the DeliveryLogRepository.
 */
@Injectable()
export class DeliveryLogPostgresRepository
  implements DeliveryLogRepository
{
  constructor(
    @InjectRepository(DeliveryLogOrmEntity)
    private readonly repository: Repository<DeliveryLogOrmEntity>,
  ) {}

  /**
   * Creates a new delivery log entry in the database.
   * @param log
   */
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

  /**
   * Finds delivery logs by combo sale ID.
   * @param comboSaleId
   */
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

  /**
   * Finds delivery logs by company ID and combo sale ID.
   * @param companyId
   * @param comboSaleId
   */
  async findByCompanyAndComboSaleId(
    companyId: string,
    comboSaleId: string,
  ): Promise<DeliveryLog[]> {

    const entities =
      await this.repository.find({
        where: {
          companyId,
          comboSaleId,
        },
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
