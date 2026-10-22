import {
    MigrationInterface,
    QueryRunner,
} from 'typeorm';

export class InitialComboSale1730000000000
    implements MigrationInterface
{
    name = 'InitialComboSale1730000000000';

    public async up(
        queryRunner: QueryRunner,
    ): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE combo_sales (
        id UUID PRIMARY KEY,

        combo_id UUID NOT NULL,

        total_units INTEGER NOT NULL,

        delivered_units INTEGER NOT NULL DEFAULT 0,

        status VARCHAR(20) NOT NULL,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

        await queryRunner.query(`
      CREATE INDEX idx_combo_sales_status
      ON combo_sales(status);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_combo_sales_combo_id
      ON combo_sales(combo_id);
    `);
    }

    public async down(
        queryRunner: QueryRunner,
    ): Promise<void> {
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_combo_sales_combo_id;
    `);

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_combo_sales_status;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS combo_sales;
    `);
    }
}