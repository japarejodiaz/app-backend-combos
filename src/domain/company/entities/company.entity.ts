export class Company {

  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly active: boolean,
  ) {}

}