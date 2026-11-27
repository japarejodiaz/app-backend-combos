import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

@Injectable()
export class DeactivateTableUseCase {

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

    table.active = false;

    return this.repository.update(
      table,
    );

  }

}