import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CompanyRepository } from '../../../../domain/company/repositories/company.repository';

import { Company } from '../../../../domain/company/entities/company.entity';

import { CompanyOrmEntity } from '../entities/company.orm-entity';

@Injectable()
export class PostgresCompanyRepository
  implements CompanyRepository
{
  constructor(
    @InjectRepository(
      CompanyOrmEntity,
    )
    private readonly repository:
    Repository<CompanyOrmEntity>,
  ) {}

  async create(
    company: Company,
  ): Promise<Company> {

    const entity =
      this.repository.create({
        id: company.id,
        code: company.code,
        name: company.name,
        active: company.active,
      });

    await this.repository.save(
      entity,
    );

    return company;
  }

  async findById(
    id: string,
  ): Promise<Company | null> {

    const entity =
      await this.repository.findOne({
        where: { id },
      });

    return entity
      ? this.toDomain(entity)
      : null;
  }

  async findByCode(
    code: string,
  ): Promise<Company | null> {

    const entity =
      await this.repository.findOne({
        where: { code },
      });

    return entity
      ? this.toDomain(entity)
      : null;
  }

  async findAll(): Promise<Company[]> {

    const entities =
      await this.repository.find({
        order: {
          name: 'ASC',
        },
      });

    return entities.map(
      entity =>
        this.toDomain(entity),
    );
  }

  async update(
    company: Company,
  ): Promise<Company> {

    await this.repository.update(
      company.id,
      {
        code: company.code,
        name: company.name,
        active: company.active,
      },
    );

    return company;
  }

  private toDomain(
    entity: CompanyOrmEntity,
  ): Company {

    return new Company(
      entity.id,
      entity.code,
      entity.name,
      entity.active,
    );

  }

}