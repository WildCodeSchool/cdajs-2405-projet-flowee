import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1748290594382 implements MigrationInterface {
  name = "1748290593Init1748290594382";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."account_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "activationToken" character varying, "tokenExpiresAt" TIMESTAMP, "status" "public"."account_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("id" SERIAL NOT NULL, "clientName" character varying, "status" character varying DEFAULT 'ACTIVE', "account_id" integer, CONSTRAINT "REL_b3627c981b3d782cb5a2845e3d" UNIQUE ("account_id"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b3627c981b3d782cb5a2845e3d" ON "client" ("account_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" character varying, "startDate" character varying, "endDate" character varying, "deliverableId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deliverable" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "perimeter" character varying, "endDate" character varying, "status" character varying, "createdAt" character varying, "reviewTimes" integer, "projectId" integer, CONSTRAINT "PK_fbed21e1ad3464d9fb7729ad51d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "projectName" character varying, "companyUserId" integer NOT NULL, "description" character varying, "startDate" character varying, "endDate" character varying, "status" character varying NOT NULL DEFAULT 'NOT_STARTED', "clientId" integer NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying, "contactInfo" character varying, "createdAt" TIMESTAMP, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "account_id" integer, "companyId" integer, CONSTRAINT "REL_3bc4f76c602938227d2ffb5497" UNIQUE ("account_id"), CONSTRAINT "PK_51957339b1339043f06ff4d57f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" ADD CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f5a50c31ccad644d8826ceea22b" FOREIGN KEY ("deliverableId") REFERENCES "deliverable"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deliverable" ADD CONSTRAINT "FK_a7c9e89ea29e2058b4c85851169" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_bb5e081fb9b8b514fbb86059728" FOREIGN KEY ("companyUserId") REFERENCES "company user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "FK_3bc4f76c602938227d2ffb54971" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" ADD CONSTRAINT "FK_54d628a6248b332c2ea30d37ae4" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "FK_54d628a6248b332c2ea30d37ae4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company user" DROP CONSTRAINT "FK_3bc4f76c602938227d2ffb54971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_bb5e081fb9b8b514fbb86059728"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deliverable" DROP CONSTRAINT "FK_a7c9e89ea29e2058b4c85851169"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f5a50c31ccad644d8826ceea22b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "client" DROP CONSTRAINT "FK_b3627c981b3d782cb5a2845e3d8"`,
    );
    await queryRunner.query(`DROP TABLE "company user"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "deliverable"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3627c981b3d782cb5a2845e3d"`,
    );
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
  }
}
