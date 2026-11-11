import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ComboSaleRepository } from '../../../../domain/combo-sale/repositories/combo-sale.repository';

import { ComboSale } from '../../../../domain/combo-sale/entities/combo-sale.entity';

import { ComboSaleOrmEntity } from '../entities/combo-sale.orm-entity';

@Injectable()
export class PostgresComboSaleRepository
  implements ComboSaleRepository {
  constructor(
    @InjectRepository(
      ComboSaleOrmEntity,
    )
    private readonly repository: Repository<ComboSaleOrmEntity>,
  ) {
  }

  async create(
    sale: ComboSale,
  ): Promise<ComboSale> {

    const entity =
      this.repository.create({
        id: sale.id,
        companyId: sale.companyId,
        comboId: sale.comboId,
        totalUnits: sale.totalUnits,
        deliveredUnits: sale.deliveredUnits,
        status: sale.status,
      });

    await this.repository.save(entity);

    return sale;
  }

  async findById(
    id: string,
  ): Promise<ComboSale | null> {

    const entity =
      await this.repository.findOne({
        where: { id },
      });

    if (!entity) {
      return null;
    }

    return new ComboSale(
      entity.id,
      entity.companyId,
      entity.comboId,
      entity.totalUnits,
      entity.deliveredUnits,
      entity.status as any,
    );
  }

  async update(
    sale: ComboSale,
  ): Promise<ComboSale> {

    await this.repository.update(
      sale.id,
      {
        deliveredUnits: sale.deliveredUnits,
        status: sale.status,
      },
    );

    return sale;
  }

  async findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<ComboSale | null> {

    const entity =
      await this.repository.findOne({
        where: {
          id,
          companyId,
        },
      });

    if (!entity) {
      return null;
    }

    return new ComboSale(
      entity.id,
      entity.companyId,
      entity.comboId,
      entity.totalUnits,
      entity.deliveredUnits,
      entity.status as any,
    );

  }
}
