export class DiningTable {

  constructor(
    public readonly id: string,

    public readonly companyId: string,

    public code: string,

    public name: string,

    public capacity: number,

    public active: boolean,
  ) {}

}
