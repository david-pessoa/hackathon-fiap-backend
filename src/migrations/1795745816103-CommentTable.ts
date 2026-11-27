import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentTable1795745816103 implements MigrationInterface {
    name = 'CommentTable1795745816103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, "editedAt" TIMESTAMP NOT NULL, "content" character varying NOT NULL, "image" bytea, "occurence_id" uuid NOT NULL, "user_id" uuid, CONSTRAINT "UQ_e6466e8b26964324929c65718d0" UNIQUE ("occurence_id", "user_id"), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_676592e7fedc47344272555291d" FOREIGN KEY ("occurence_id") REFERENCES "occurences"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_676592e7fedc47344272555291d"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
