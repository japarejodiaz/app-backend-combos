import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetTableByIdUseCase {

  constructor(
    private readonly repository:
    DiningTableRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
  ) {

    const table =
      currentUser.role ===
      UserRole.SUPER_ADMIN

        ? await this.repository.findById(
          id,
        )

        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!table) {

      throw new NotFoundException(
        'Table not found',
      );

    }

    return table;

  }

}