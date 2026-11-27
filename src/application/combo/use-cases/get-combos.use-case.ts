import {
  Injectable,
} from '@nestjs/common';

import { ComboRepository }
  from '../../../domain/combo/repositories/combo.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetCombosUseCase {

  constructor(
    private readonly repository:
    ComboRepository,
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