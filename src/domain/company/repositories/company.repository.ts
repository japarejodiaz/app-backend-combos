import { Company } from '../entities/company.entity';

export abstract class CompanyRepository {

  abstract create(
    company: Company,
  ): Promise<Company>;

  abstract findById(
    id: string,
  ): Promise<Company | null>;

  abstract findByCode(
    code: string,
  ): Promise<Company | null>;

  abstract findAll():
    Promise<Company[]>;

  abstract update(
    company: Company,
  ): Promise<Company>;
}