import { UserRole } from '../enums/user-role.enum';

export class User {

  constructor(
    public readonly id: string,

    public readonly companyId: string,

    public username: string,

    public email: string,

    public readonly password: string,

    public role: UserRole,

    public active: boolean,
  ) {}

}