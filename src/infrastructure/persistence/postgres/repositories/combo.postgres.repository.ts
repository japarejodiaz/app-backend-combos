import { Injectable } from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import { Combo }
  from '../../../../domain/combo/entities/combo.entity';

import { ComboRepository }
  from '../../../../domain/combo/repositories/combo.repository';

import { ComboOrmEntity }
  from '../entities/combo.orm-entity';

@Injectable()
export class PostgresComboRepository
  implements ComboRepository
{
  constructor(
    @InjectRepository(
      ComboOrmEntity,
    )
    private readonly repository:
    Repository<ComboOrmEntity>,
  ) {}

  async create(
    combo: Combo,
  ): Promise<Combo> {

    const entity =
      this.repository.create({

        id: combo.id,

        companyId:
        combo.companyId,

        code:
        combo.code,

        name:
        combo.name,

        description:
        combo.description,

        active:
        combo.active,

      });

    await this.repository.save(
      entity,
    );

    return combo;

  }

  async findAll():
    Promise<Combo[]> {

    const entities =
      await this.repository.find({

        order: {
          code: 'ASC',
        },

      });

    return entities.map(
      entity =>
        this.toDomain(entity),
    );

  }

  async findById(
    id: string,
  ): Promise<Combo | null> {

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

  async findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<Combo | null> {

    const entity =
      await this.repository.findOne({

        where: {
          companyId,
          id,
        },

      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

  async findByCompanyId(
    companyId: string,
  ): Promise<Combo[]> {

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

  async findByCode(
    companyId: string,
    code: string,
  ): Promise<Combo | null> {

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
    combo: Combo,
  ): Promise<Combo> {

    await this.repository.update(
      combo.id,
      {
        code: combo.code,
        name: combo.name,
        description:
        combo.description,
        active: combo.active,
      },
    );

    return combo;

  }

  private toDomain(
    entity: ComboOrmEntity,
  ): Combo {

    return new Combo(

      entity.id,

      entity.companyId,

      entity.code,

      entity.name,

      entity.description,

      entity.active,

    );

  }

}