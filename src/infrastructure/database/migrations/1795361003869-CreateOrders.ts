import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1795361003869 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      CREATE TABLE orders (

        id UUID PRIMARY KEY,

        company_id UUID NOT NULL,

        table_id UUID NULL,

        order_number INTEGER NOT NULL,

        status VARCHAR(20) NOT NULL,

        opened_by UUID NOT NULL,

        opened_at TIMESTAMP NOT NULL,

        closed_at TIMESTAMP NULL,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT fk_orders_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id),

        CONSTRAINT fk_orders_table
        FOREIGN KEY (table_id)
        REFERENCES tables(id)

      );
    `);

        await queryRunner.query(`
      CREATE UNIQUE INDEX
      idx_orders_company_number

      ON orders(
        company_id,
        order_number
      );
    `);

        await queryRunner.query(`
      CREATE INDEX
      idx_orders_company

      ON orders(company_id);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_orders_company;
    `);

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_orders_company_number;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS orders;
    `);

    }

}
