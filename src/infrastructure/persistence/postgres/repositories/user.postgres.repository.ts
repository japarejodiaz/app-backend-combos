import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserRepository } from '../../../../domain/user/repositories/user.repository';
import { User } from '../../../../domain/user/entities/user.entity';

import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class PostgresUserRepository
  implements UserRepository
{
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(
    user: User,
  ): Promise<User> {

    const entity = this.repository.create({
      id: user.id,
      companyId: user.companyId,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      active: user.active,
    });

    await this.repository.save(entity);

    return user;
  }

  async findById(
    id: string,
  ): Promise<User | null> {

    const entity =
      await this.repository.findOne({
        where: { id },
      });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  }

  async findByUsername(
    username: string,
  ): Promise<User | null> {

    const entity =
      await this.repository.findOne({
        where: { username },
      });

    return entity
      ? this.toDomain(entity)
      : null;
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {

    const entity =
      await this.repository.findOne({
        where: { email },
      });

    return entity
      ? this.toDomain(entity)
      : null;
  }

  private toDomain(
    entity: UserOrmEntity,
  ): User {

    return new User(
      entity.id,
      entity.companyId,
      entity.username,
      entity.email,
      entity.password,
      entity.role as any,
      entity.active,
    );

  }

}