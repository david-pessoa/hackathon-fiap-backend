import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOccurenceViewTable1795743339699 implements MigrationInterface {
    name = 'CreateOccurenceViewTable1795743339699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "occurence_views" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "viewedAt" TIMESTAMP NOT NULL, "occurence_id" uuid NOT NULL, "user_id" uuid, CONSTRAINT "UQ_5c3066646a2d165ac24eb6380a1" UNIQUE ("occurence_id", "user_id"), CONSTRAINT "PK_b655a55e995a1811740758e0a62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "occurence_views" ADD CONSTRAINT "FK_57e5377feadda006f7d1296ab38" FOREIGN KEY ("occurence_id") REFERENCES "occurences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurence_views" ADD CONSTRAINT "FK_a67117e24b98807dd6b78eed205" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occurence_views" DROP CONSTRAINT "FK_a67117e24b98807dd6b78eed205"`);
        await queryRunner.query(`ALTER TABLE "occurence_views" DROP CONSTRAINT "FK_57e5377feadda006f7d1296ab38"`);
        await queryRunner.query(`DROP TABLE "occurence_views"`);
    }

}
