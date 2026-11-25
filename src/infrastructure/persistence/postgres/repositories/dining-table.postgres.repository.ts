import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { DiningTableRepository } from '../../../../domain/table/repositories/dining-table.repository';

import { DiningTable } from '../../../../domain/table/entities/dining-table.entity';

import { DiningTableOrmEntity } from '../entities/dining-table.orm-entity';

@Injectable()
export class PostgresDiningTableRepository
  implements DiningTableRepository
{
  constructor(
    @InjectRepository(
      DiningTableOrmEntity,
    )
    private readonly repository:
    Repository<DiningTableOrmEntity>,
  ) {}

  async create(
    table: DiningTable,
  ): Promise<DiningTable> {

    const entity =
      this.repository.create({
        id: table.id,
        companyId: table.companyId,
        code: table.code,
        name: table.name,
        capacity: table.capacity,
        active: table.active,
      });

    await this.repository.save(
      entity,
    );

    return table;

  }

  async findById(
    id: string,
  ): Promise<DiningTable | null> {

    const entity =
      await this.repository.findOne({
        where: {
          id,
        },
      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async findByCompanyId(
    companyId: string,
  ): Promise<DiningTable[]> {

    const entities =
      await this.repository.find({

        where: {
          companyId,
        },

        order: {
          code: 'ASC',
        },

      });

    return entities.map(
      entity =>
        this.toDomain(entity),
    );

  }

  async findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<DiningTable | null> {

    const entity =
      await this.repository.findOne({

        where: {
          companyId,
          code,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async findByCode(
    companyId: string,
    code: string,
  ): Promise<DiningTable | null> {

    const entity =
      await this.repository.findOne({

        where: {
          companyId,
          code,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async update(
    table: DiningTable,
  ): Promise<DiningTable> {

    await this.repository.update(
      table.id,
      {
        code: table.code,
        name: table.name,
        capacity: table.capacity,
        active: table.active,
      },
    );

    return table;

  }

  private toDomain(
    entity: DiningTableOrmEntity,
  ): DiningTable {

    return new DiningTable(

      entity.id,

      entity.companyId,

      entity.code,

      entity.name,

      entity.capacity,

      entity.active,

    );

  }

  async findAll():
    Promise<DiningTable[]> {

    const entities =
      await this.repository.find({

        order: {
          code: 'ASC',
        },

      });

    return entities.map(
      entity =>
        this.toDomain(
          entity,
        ),
    );

  }


  async findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<DiningTable | null> {

    const entity =
      await this.repository.findOne({

        where: {
          id,
          companyId,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

}