import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1645539699140 implements MigrationInterface {
  name = 'initial1645539699140'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(250) NOT NULL, "slug" character varying(250) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`)
  }
}
