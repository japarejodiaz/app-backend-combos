export class Combo {

  constructor(

    public readonly id: string,

    public readonly companyId: string,

    public code: string,

    public name: string,

    public description: string | null,

    public active: boolean,

  ) {}

}
