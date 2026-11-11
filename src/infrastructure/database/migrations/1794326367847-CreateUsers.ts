import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1794326367847 implements MigrationInterface {

    public async up(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      CREATE TABLE users (

        id UUID PRIMARY KEY,

        company_id UUID NOT NULL,

        username VARCHAR(50) NOT NULL UNIQUE,

        email VARCHAR(150) NOT NULL UNIQUE,

        password VARCHAR(255) NOT NULL,

        role VARCHAR(30) NOT NULL,

        active BOOLEAN NOT NULL DEFAULT TRUE,

        created_at TIMESTAMP NOT NULL DEFAULT NOW(),

        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT fk_users_company
          FOREIGN KEY (company_id)
          REFERENCES companies(id)

      );
    `);

        await queryRunner.query(`
      CREATE INDEX idx_users_company
      ON users(company_id);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_users_username
      ON users(username);
    `);

        await queryRunner.query(`
      CREATE INDEX idx_users_email
      ON users(email);
    `);

    }

    public async down(
      queryRunner: QueryRunner,
    ): Promise<void> {

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_users_email;
    `);

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_users_username;
    `);

        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_users_company;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS users;
    `);

    }

}
