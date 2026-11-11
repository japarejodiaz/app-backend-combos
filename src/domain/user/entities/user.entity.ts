import { UserRole } from '../enums/user-role.enum';

export class User {

  constructor(
    public readonly id: string,

    public readonly companyId: string,

    public readonly username: string,

    public readonly email: string,

    public readonly password: string,

    public readonly role: UserRole,

    public readonly active: boolean,
  ) {}

}