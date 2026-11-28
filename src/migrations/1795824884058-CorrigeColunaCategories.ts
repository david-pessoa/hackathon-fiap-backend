import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrigeColunaCategories1795824884058 implements MigrationInterface {
    name = 'CorrigeColunaCategories1795824884058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_categories_categories" ("usersId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_46c5954d3d84a4ead3b685b3f08" PRIMARY KEY ("usersId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca7c470ba1ddea82ea5bf425e5" ON "users_categories_categories" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49f431f869d5c07df806b0ab8c" ON "users_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "users_categories_categories" ADD CONSTRAINT "FK_ca7c470ba1ddea82ea5bf425e50" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_categories_categories" ADD CONSTRAINT "FK_49f431f869d5c07df806b0ab8ca" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_categories_categories" DROP CONSTRAINT "FK_49f431f869d5c07df806b0ab8ca"`);
        await queryRunner.query(`ALTER TABLE "users_categories_categories" DROP CONSTRAINT "FK_ca7c470ba1ddea82ea5bf425e50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49f431f869d5c07df806b0ab8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca7c470ba1ddea82ea5bf425e5"`);
        await queryRunner.query(`DROP TABLE "users_categories_categories"`);
    }

}
