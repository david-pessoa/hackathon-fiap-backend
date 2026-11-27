import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOccurenceTable1795741884534 implements MigrationInterface {
    name = 'CreateOccurenceTable1795741884534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."occurences_status_enum" AS ENUM('OPEN', 'UNDER_ANALYSIS', 'IN_PROGRESS', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TYPE "public"."occurences_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`);
        await queryRunner.query(`CREATE TYPE "public"."occurences_rating_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`CREATE TABLE "occurences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."occurences_status_enum" NOT NULL DEFAULT 'OPEN', "priority" "public"."occurences_priority_enum" NOT NULL DEFAULT 'LOW', "location" character varying NOT NULL, "image" bytea, "createdAt" TIMESTAMP NOT NULL, "rating" "public"."occurences_rating_enum", "requester_id" uuid NOT NULL, "employee_id" uuid, "category_id" uuid NOT NULL, CONSTRAINT "PK_53eafb1cb2ffc77880f9592f074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "occurences" ADD CONSTRAINT "FK_7161b306aae8c848873256563b7" FOREIGN KEY ("requester_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurences" ADD CONSTRAINT "FK_e5e76ce0c1bf0d8db70322c9653" FOREIGN KEY ("employee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurences" ADD CONSTRAINT "FK_aa76e1679c50ef1798515b7e41e" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occurences" DROP CONSTRAINT "FK_aa76e1679c50ef1798515b7e41e"`);
        await queryRunner.query(`ALTER TABLE "occurences" DROP CONSTRAINT "FK_e5e76ce0c1bf0d8db70322c9653"`);
        await queryRunner.query(`ALTER TABLE "occurences" DROP CONSTRAINT "FK_7161b306aae8c848873256563b7"`);
        await queryRunner.query(`DROP TABLE "occurences"`);
        await queryRunner.query(`DROP TYPE "public"."occurences_rating_enum"`);
        await queryRunner.query(`DROP TYPE "public"."occurences_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."occurences_status_enum"`);
    }

}
