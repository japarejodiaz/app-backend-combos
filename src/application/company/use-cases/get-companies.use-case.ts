import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '../../../domain/company/repositories/company.repository';

@Injectable()
export class GetCompaniesUseCase {

  constructor(
    private readonly companyRepository:
    CompanyRepository,
  ) {}

  async execute() {

    return this.companyRepository.findAll();

  }

}