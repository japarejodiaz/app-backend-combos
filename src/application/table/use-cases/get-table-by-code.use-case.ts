import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

@Injectable()
export class GetTableByCodeUseCase {

  constructor(
    private readonly repository:
    DiningTableRepository,
  ) {}

  async execute(
    currentUser: any,
    code: string,
  ) {

    const table =
      await this.repository
        .findByCompanyAndCode(
          currentUser.companyId,
          code,
        );

    if (!table) {

      throw new NotFoundException(
        'Table not found',
      );

    }

    return table;

  }

}