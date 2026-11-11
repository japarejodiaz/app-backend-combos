import {
    MigrationInterface,
    QueryRunner,
} from 'typeorm';

export class CreateDeliveryLogs1794269217288
  implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      CREATE TABLE delivery_logs (

        id UUID PRIMARY KEY,

        combo_sale_id UUID NOT NULL,

        units INTEGER NOT NULL,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT fk_delivery_logs_sale
          FOREIGN KEY (combo_sale_id)
          REFERENCES combo_sales(id)

      );
    `);

        await queryRunner.query(`
      CREATE INDEX idx_delivery_logs_combo_sale
      ON delivery_logs(combo_sale_id);
    `);
    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_delivery_logs_combo_sale;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS delivery_logs;
    `);

    }

}