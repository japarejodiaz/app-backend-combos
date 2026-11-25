import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { UserRepository }
  from '../../../domain/user/repositories/user.repository';

import { UpdateUserDto }
  from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {

  constructor(
    private readonly repository:
    UserRepository,
  ) {}

  async execute(
    currentUser: any,
    id: string,
    dto: UpdateUserDto,
  ) {

    const user =
      currentUser.role === UserRole.SUPER_ADMIN
        ? await this.repository.findById(
          id,
        )
        : await this.repository.findByCompanyAndId(
          currentUser.companyId,
          id,
        );

    if (!user) {

      throw new NotFoundException(
        'User not found',
      );

    }

    if (
      currentUser.role === UserRole.OWNER &&
      dto.role
    ) {

      if (
        dto.role === UserRole.OWNER ||
        dto.role === UserRole.SUPER_ADMIN
      ) {

        throw new ForbiddenException(
          'Role not allowed',
        );

      }

    }

    if (
      dto.username &&
      dto.username !== user.username
    ) {

      const usernameExists =
        await this.repository.findByUsername(
          dto.username,
        );

      if (
        usernameExists &&
        usernameExists.id !== user.id
      ) {

        throw new ConflictException(
          'Username already exists',
        );

      }

      user.username = dto.username;

    }

    if (
      dto.email &&
      dto.email !== user.email
    ) {

      const emailExists =
        await this.repository.findByEmail(
          dto.email,
        );

      if (
        emailExists &&
        emailExists.id !== user.id
      ) {

        throw new ConflictException(
          'Email already exists',
        );

      }

      user.email = dto.email;

    }

    if (dto.role) {

      user.role = dto.role;

    }

    return this.repository.update(
      user,
    );

  }

}