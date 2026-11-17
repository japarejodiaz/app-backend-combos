import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';

import { UserOrmEntity } from '../../../infrastructure/persistence/postgres/entities/user.orm-entity';

import { UserRepository } from '../../../domain/user/repositories/user.repository';

import { PostgresUserRepository } from '../../../infrastructure/persistence/postgres/repositories/user.postgres.repository';

import { CreateUserUseCase } from '../../../application/user/use-cases/create-user.use-case';
import { GetUsersUseCase }
  from '../../../application/user/use-cases/get-users.use-case';
import { GetUserByIdUseCase }
  from '../../../application/user/use-cases/get-user-by-id.use-case';

import { PasswordService } from '../../../infrastructure/security/services/password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOrmEntity,
    ]),
  ],

  controllers: [
    UserController,
  ],

  providers: [

    PasswordService,
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,

    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },

  ],

  exports: [
    UserRepository,
    PasswordService,
  ],

})
export class UserModule {}