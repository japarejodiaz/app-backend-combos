import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingForeignKeysToOrders1795362876864 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      ALTER TABLE orders
      ADD CONSTRAINT fk_orders_opened_by
      FOREIGN KEY (opened_by)
      REFERENCES users(id);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_orders_opened_by
      ON orders(opened_by);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_orders_opened_by;
    `);

        await queryRunner.query(`
      ALTER TABLE orders
      DROP CONSTRAINT IF EXISTS
      fk_orders_opened_by;
    `);

    }

}
