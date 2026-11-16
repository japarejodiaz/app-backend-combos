import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CompanyRepository } from '../../../domain/company/repositories/company.repository';

@Injectable()
export class DeactivateCompanyUseCase {

  constructor(
    private readonly companyRepository:
    CompanyRepository,
  ) {}

  async execute(
    id: string,
  ) {

    const company =
      await this.companyRepository.findById(
        id,
      );

    if (!company) {

      throw new NotFoundException(
        'Company not found',
      );

    }

    company.active = false;

    await this.companyRepository.update(
      company,
    );

    return company;

  }

}