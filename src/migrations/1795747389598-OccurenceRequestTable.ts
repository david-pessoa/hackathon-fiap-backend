import { MigrationInterface, QueryRunner } from "typeorm";

export class OccurenceRequestTable1795747389598 implements MigrationInterface {
    name = 'OccurenceRequestTable1795747389598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."occurence_requests_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TYPE "public"."occurence_requests_type_enum" AS ENUM('COMPLETION', 'CANCELLATION')`);
        await queryRunner.query(`CREATE TABLE "occurence_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "reviewedAt" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "status" "public"."occurence_requests_status_enum" NOT NULL DEFAULT 'PENDING', "type" "public"."occurence_requests_type_enum" NOT NULL, "image" bytea, "occurence_id" uuid NOT NULL, "requested_by" uuid, "reviewed_by" uuid, CONSTRAINT "UQ_aeef8f1f12a22a010b81a712ea6" UNIQUE ("occurence_id", "requested_by", "reviewed_by"), CONSTRAINT "PK_75350ab61833798aa2fc6d4c65e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "editedAt"`);
        await queryRunner.query(`ALTER TABLE "occurence_requests" ADD CONSTRAINT "FK_5f5f7cc6f2a61bd5cc46b5023ee" FOREIGN KEY ("occurence_id") REFERENCES "occurences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurence_requests" ADD CONSTRAINT "FK_5dd4572fe8877290898641d63c3" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurence_requests" ADD CONSTRAINT "FK_a9363e2091fc6ed5bc46239d53f" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occurence_requests" DROP CONSTRAINT "FK_a9363e2091fc6ed5bc46239d53f"`);
        await queryRunner.query(`ALTER TABLE "occurence_requests" DROP CONSTRAINT "FK_5dd4572fe8877290898641d63c3"`);
        await queryRunner.query(`ALTER TABLE "occurence_requests" DROP CONSTRAINT "FK_5f5f7cc6f2a61bd5cc46b5023ee"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "editedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "occurence_requests"`);
        await queryRunner.query(`DROP TYPE "public"."occurence_requests_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."occurence_requests_status_enum"`);
    }

}
