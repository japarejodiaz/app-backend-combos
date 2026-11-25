import { DiningTable } from '../entities/dining-table.entity';

export abstract class DiningTableRepository {

  abstract create(
    table: DiningTable,
  ): Promise<DiningTable>;

  abstract findById(
    id: string,
  ): Promise<DiningTable | null>;

  abstract findByCompanyId(
    companyId: string,
  ): Promise<DiningTable[]>;

  abstract findByCompanyAndId(
    companyId: string,
    id: string,
  ): Promise<DiningTable | null>;

  abstract update(
    table: DiningTable,
  ): Promise<DiningTable>;

  abstract findByCode(
    companyId: string,
    code: string,
  ): Promise<DiningTable | null>;

  abstract findByCompanyAndCode(
    companyId: string,
    code: string,
  ): Promise<DiningTable | null>;

  abstract findAll():
    Promise<DiningTable[]>;

}