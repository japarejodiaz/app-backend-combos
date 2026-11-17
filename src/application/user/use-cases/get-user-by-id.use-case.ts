import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository }
  from '../../../domain/user/repositories/user.repository';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

@Injectable()
export class GetUserByIdUseCase {

  constructor(
    private readonly repository:
    UserRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
  ) {

    if (
      currentUser.role ===
      UserRole.SUPER_ADMIN
    ) {

      const user =
        await this.repository.findById(
          id,
        );

      if (!user) {

        throw new NotFoundException(
          'User not found',
        );

      }

      return user;

    }

    const user =
      await this.repository.findByCompanyAndId(
        currentUser.companyId,
        id,
      );

    if (!user) {

      throw new NotFoundException(
        'User not found',
      );

    }

    return user;

  }

}
