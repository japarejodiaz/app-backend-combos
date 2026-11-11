import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyToDeliveryLogs1794313310847 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      ALTER TABLE delivery_logs
      ADD COLUMN company_id UUID;
    `);

        await queryRunner.query(`
      UPDATE delivery_logs
      SET company_id =
      '11111111-1111-1111-1111-111111111111';
    `);

        await queryRunner.query(`
      ALTER TABLE delivery_logs
      ALTER COLUMN company_id SET NOT NULL;
    `);

        await queryRunner.query(`
      ALTER TABLE delivery_logs
      ADD CONSTRAINT fk_delivery_logs_company
      FOREIGN KEY (company_id)
      REFERENCES companies(id);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_delivery_logs_company
      ON delivery_logs(company_id);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_delivery_logs_company;
    `);

        await queryRunner.query(`
      ALTER TABLE delivery_logs
      DROP CONSTRAINT IF EXISTS
      fk_delivery_logs_company;
    `);

        await queryRunner.query(`
      ALTER TABLE delivery_logs
      DROP COLUMN IF EXISTS company_id;
    `);

    }

}
