import type { MigrationInterface, QueryRunner } from "typeorm";

export class AccountUuid1749113022 implements MigrationInterface {
  name = "AccountUuidMigration1749113022152043";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "FK_3bc4f76c602938227d2ffb54971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "REL_3bc4f76c602938227d2ffb5497"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP COLUMN "account_id"`,
    );
    await queryRunner.query(`ALTER TABLE "company user" ADD "account_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "UQ_3bc4f76c602938227d2ffb54971" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3627c981b3d782cb5a2845e3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "REL_b3627c981b3d782cb5a2845e3d"`,
    );
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "account_id"`);
    await queryRunner.query(`ALTER TABLE "client" ADD "account_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "UQ_b3627c981b3d782cb5a2845e3d8" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b3627c981b3d782cb5a2845e3d" ON "client" ("account_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "FK_3bc4f76c602938227d2ffb54971" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "FK_3bc4f76c602938227d2ffb54971"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3627c981b3d782cb5a2845e3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "UQ_b3627c981b3d782cb5a2845e3d8"`,
    );
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "account_id"`);
    await queryRunner.query(`ALTER TABLE "client" ADD "account_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "REL_b3627c981b3d782cb5a2845e3d" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b3627c981b3d782cb5a2845e3d" ON "client" ("account_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "account" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "UQ_3bc4f76c602938227d2ffb54971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP COLUMN "account_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD "account_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "REL_3bc4f76c602938227d2ffb5497" UNIQUE ("account_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "FK_3bc4f76c602938227d2ffb54971" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
