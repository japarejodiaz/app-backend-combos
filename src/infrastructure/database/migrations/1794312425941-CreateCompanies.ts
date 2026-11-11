import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanies1794312425941 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      CREATE TABLE companies (

        id UUID PRIMARY KEY,

        code VARCHAR(20) NOT NULL UNIQUE,

        name VARCHAR(150) NOT NULL,

        active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMP NOT NULL DEFAULT NOW()

      );
    `);

        await queryRunner.query(`
      CREATE INDEX idx_companies_code
      ON companies(code);
    `);

        await queryRunner.query(`
      INSERT INTO companies
      (
        id,
        code,
        name,
        active
      )
      VALUES
      (
        '11111111-1111-1111-1111-111111111111',
        'DEMO',
        'Empresa Demo',
        TRUE
      );
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_companies_code;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS companies;
    `);

    }

}
