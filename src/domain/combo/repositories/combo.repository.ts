import { Combo }
  from '../entities/combo.entity';

export abstract class ComboRepository {

  abstract create(
    combo: Combo,
  ): Promise<Combo>;

  abstract findAll():
    Promise<Combo[]>;

  abstract findById(
    id: string,
  ): Promise<Combo | null>;

  abstract findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<Combo | null>;

  abstract findByCompanyId(
    companyId: string,
  ): Promise<Combo[]>;

  abstract findByCode(
    companyId: string,
    code: string,
  ): Promise<Combo | null>;

  abstract update(
    combo: Combo,
  ): Promise<Combo>;

}