import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatusHistoryTable1795744795559 implements MigrationInterface {
    name = 'CreateStatusHistoryTable1795744795559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."status_history_previousstatus_enum" AS ENUM('OPEN', 'UNDER_ANALYSIS', 'IN_PROGRESS', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TYPE "public"."status_history_newstatus_enum" AS ENUM('OPEN', 'UNDER_ANALYSIS', 'IN_PROGRESS', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "status_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "observation" character varying NOT NULL, "previousStatus" "public"."status_history_previousstatus_enum" NOT NULL DEFAULT 'OPEN', "newStatus" "public"."status_history_newstatus_enum" NOT NULL DEFAULT 'UNDER_ANALYSIS', "image" bytea, "occurence_id" uuid NOT NULL, "manager_id" uuid, CONSTRAINT "UQ_5b0b5438e0ec6e6050f3d2ac8ba" UNIQUE ("occurence_id", "manager_id"), CONSTRAINT "PK_271a5228edb4eeb41bc01d58fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "status_history" ADD CONSTRAINT "FK_ecb9d1a29fafa2cdb4ddf97737e" FOREIGN KEY ("occurence_id") REFERENCES "occurences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "status_history" ADD CONSTRAINT "FK_d2269fe09198c894cd3ca4ab890" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_history" DROP CONSTRAINT "FK_d2269fe09198c894cd3ca4ab890"`);
        await queryRunner.query(`ALTER TABLE "status_history" DROP CONSTRAINT "FK_ecb9d1a29fafa2cdb4ddf97737e"`);
        await queryRunner.query(`DROP TABLE "status_history"`);
        await queryRunner.query(`DROP TYPE "public"."status_history_newstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."status_history_previousstatus_enum"`);
    }

}
