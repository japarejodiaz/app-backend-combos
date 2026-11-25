import { User } from '../entities/user.entity';

export abstract class UserRepository {

  abstract create(
    user: User,
  ): Promise<User>;

  abstract findById(
    id: string,
  ): Promise<User | null>;

  abstract findByUsername(
    username: string,
  ): Promise<User | null>;

  abstract findByEmail(
    email: string,
  ): Promise<User | null>;

  abstract findAll():
    Promise<User[]>;

  abstract findByCompanyId(
    companyId: string,
  ): Promise<User[]>;

  abstract findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<User | null>;

  abstract update(
    user: User,
  ): Promise<User>;


}