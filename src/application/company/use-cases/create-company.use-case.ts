import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { Company } from '../../../domain/company/entities/company.entity';

import { CompanyRepository } from '../../../domain/company/repositories/company.repository';

import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CreateCompanyUseCase {

  constructor(
    private readonly companyRepository:
    CompanyRepository,
  ) {}

  async execute(
    dto: CreateCompanyDto,
  ) {

    const existingCompany =
      await this.companyRepository
        .findByCode(
          dto.code,
        );

    if (existingCompany) {

      throw new ConflictException(
        'Company code already exists',
      );

    }

    const company =
      new Company(
        randomUUID(),
        dto.code,
        dto.name,
        true,
      );

    return this.companyRepository
      .create(
        company,
      );
  }

}