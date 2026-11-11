import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyToComboSales1794313288402 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      ALTER TABLE combo_sales
      ADD COLUMN company_id UUID;
    `);

        await queryRunner.query(`
      UPDATE combo_sales
      SET company_id =
      '11111111-1111-1111-1111-111111111111';
    `);

        await queryRunner.query(`
      ALTER TABLE combo_sales
      ALTER COLUMN company_id SET NOT NULL;
    `);

        await queryRunner.query(`
      ALTER TABLE combo_sales
      ADD CONSTRAINT fk_combo_sales_company
      FOREIGN KEY (company_id)
      REFERENCES companies(id);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_combo_sales_company
      ON combo_sales(company_id);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_combo_sales_company;
    `);

        await queryRunner.query(`
      ALTER TABLE combo_sales
      DROP CONSTRAINT IF EXISTS
      fk_combo_sales_company;
    `);

        await queryRunner.query(`
      ALTER TABLE combo_sales
      DROP COLUMN IF EXISTS company_id;
    `);

    }

}
