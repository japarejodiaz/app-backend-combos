import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1795360974714 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      CREATE TABLE tables (

        id UUID PRIMARY KEY,

        company_id UUID NOT NULL,

        code VARCHAR(20) NOT NULL,

        name VARCHAR(100) NOT NULL,

        capacity INTEGER NOT NULL,

        active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT fk_tables_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)

      );
    `);

        await queryRunner.query(`
      CREATE UNIQUE INDEX
      idx_tables_company_code

      ON tables(
        company_id,
        code
      );
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS
      idx_tables_company_code;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS tables;
    `);

    }

}
