export class DiningTable {

  constructor(
    public readonly id: string,

    public readonly companyId: string,

    public readonly code: string,

    public readonly name: string,

    public readonly capacity: number,

    public active: boolean,
  ) {}

}
