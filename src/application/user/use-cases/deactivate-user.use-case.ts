import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRole } from '../../../domain/user/enums/user-role.enum';

import { UserRepository } from '../../../domain/user/repositories/user.repository';

@Injectable()
export class DeactivateUserUseCase {

  constructor(
    private readonly repository:
    UserRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
  ) {

    const user =
      currentUser.role === UserRole.SUPER_ADMIN
        ? await this.repository.findById(id)
        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!user) {

      throw new NotFoundException(
        'User not found',
      );

    }

    if (user.id === currentUser.userId) {

      throw new ForbiddenException(
        'You cannot deactivate your own account',
      );

    }

    if (
      currentUser.role === UserRole.OWNER &&
      user.role === UserRole.SUPER_ADMIN
    ) {

      throw new ForbiddenException(
        'Not allowed',
      );

    }

    user.active = false;

    await this.repository.update(
      user,
    );

    return user;

  }

}