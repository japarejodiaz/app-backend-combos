import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserRepository } from '../../../../domain/user/repositories/user.repository';
import { User } from '../../../../domain/user/entities/user.entity';

import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class PostgresUserRepository
  implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {
  }

  /**
   * Creates a new user in the repository.
   * @param user
   * @returns Promise<User>
   */

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


  /**
   * Finds a user by their ID.
   * @param id
   * @returns Promise<User | null>
   */

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

  /**
   * Finds a user by their username.
   * @param username
   */
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

  /**
   * Finds a user by their email address.
   * @param email
   */

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

  /**
   * Converts a UserOrmEntity to a User domain entity.
   * @param entity
   * @private
   */

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

  /**
   * Finds all users in the repository.
   * @returns Promise<User[]>
   */

  async findAll():
    Promise<User[]> {

    const entities =
      await this.repository.find({
        order: {
          username: 'ASC',
        },
      });

    return entities.map(
      entity => this.toDomain(
        entity,
      ),
    );
  }

  /**
   * Finds all users by their company ID.
   * @param companyId
   */

  async findByCompanyId(
    companyId: string,
  ): Promise<User[]> {

    const entities =
      await this.repository.find({

        where: {
          companyId,
        },

        order: {
          username: 'ASC',
        },

      });

    return entities.map(
      entity => this.toDomain(
        entity,
      ),
    );

  }

  /**
   * Finds a user by their company ID and user ID.
   * @param companyId
   * @param id
   */
  async findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<User | null> {

    const entity =
      await this.repository.findOne({
        where: {
          id,
          companyId,
        },
      });

    return entity
      ? this.toDomain(entity)
      : null;

  }

}