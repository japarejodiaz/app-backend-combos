import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { randomUUID }
  from 'crypto';

import { User }
  from '../../../domain/user/entities/user.entity';

import { UserRole }
  from '../../../domain/user/enums/user-role.enum';

import { UserRepository }
  from '../../../domain/user/repositories/user.repository';

import { PasswordService }
  from '../../../infrastructure/security/services/password.service';

import { CreateUserDto }
  from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {

  constructor(
    private readonly repository:
    UserRepository,

    private readonly passwordService:
    PasswordService,
  ) {}

  async execute(
    currentUser: any,
    dto: CreateUserDto,
  ) {

    const existingUsername =
      await this.repository.findByUsername(
        dto.username,
      );

    if (existingUsername) {

      throw new ConflictException(
        'Username already exists',
      );

    }

    const existingEmail =
      await this.repository.findByEmail(
        dto.email,
      );

    if (existingEmail) {

      throw new ConflictException(
        'Email already exists',
      );

    }

    if (
      currentUser.role ===
      UserRole.OWNER
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

    const hash =
      await this.passwordService.hash(
        dto.password,
      );

    const user = new User(
      randomUUID(),

      currentUser.companyId,
      dto.username,
      dto.email,
      hash,
      dto.role,
      true,
    );

    return this.repository.create(
      user,
    );

  }
}