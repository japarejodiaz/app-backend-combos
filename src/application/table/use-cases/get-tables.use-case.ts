import { Injectable } from '@nestjs/common';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { DiningTableRepository }
  from '../../../domain/table/repositories/dining-table.repository';

@Injectable()
export class GetTablesUseCase {

  constructor(
    private readonly repository:
    DiningTableRepository,
  ) {}

  async execute(
    currentUser: any,
  ) {

    if (
      currentUser.role ===
      UserRole.SUPER_ADMIN
    ) {

      return this.repository.findAll();

    }

    return this.repository.findByCompanyId(
      currentUser.companyId,
    );

  }

}