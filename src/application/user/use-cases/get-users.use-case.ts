import {
  Injectable,
} from '@nestjs/common';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { UserRepository }
  from '../../../domain/user/repositories/user.repository';

@Injectable()
export class GetUsersUseCase {

  constructor(
    private readonly repository:
    UserRepository,
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