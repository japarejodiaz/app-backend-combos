import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService }
  from '@nestjs/jwt';

import { UserRepository }
  from '../../../domain/user/repositories/user.repository';

import { PasswordService }
  from '../../../infrastructure/security/services/password.service';

import { LoginDto }
  from '../dto/login.dto';

@Injectable()
export class LoginUseCase {

  constructor(
    private readonly userRepository:
    UserRepository,

    private readonly passwordService:
    PasswordService,

    private readonly jwtService:
    JwtService,
  ) {}

  async execute(
    dto: LoginDto,
  ) {

    const user =
      await this.userRepository
        .findByUsername(
          dto.username,
        );

    if (!user) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }

    const isValidPassword =
      await this.passwordService.compare(
        dto.password,
        user.password,
      );

    if (!isValidPassword) {

      throw new UnauthorizedException(
        'Invalid credentials',
      );

    }

    if (!user.active) {

      throw new UnauthorizedException(
        'User is inactive',
      );

    }

    const payload = {

      sub: user.id,

      companyId:
      user.companyId,

      role:
      user.role,

      username:
      user.username,

    };

    return {

      accessToken:
        await this.jwtService.signAsync(
          payload,
        ),

    };

  }

}