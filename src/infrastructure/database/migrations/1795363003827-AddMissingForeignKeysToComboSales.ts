import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingForeignKeysToComboSales1795363003827 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      ALTER TABLE combo_sales
      ADD CONSTRAINT fk_combo_sales_order
      FOREIGN KEY (order_id)
      REFERENCES orders(id);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_combo_sales_order
      ON combo_sales(order_id);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_combo_sales_order;
    `);

        await queryRunner.query(`
      ALTER TABLE combo_sales
      DROP CONSTRAINT IF EXISTS
      fk_combo_sales_order;
    `);

    }

}
