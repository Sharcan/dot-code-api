import {MigrationInterface, QueryRunner} from "typeorm";

export class teamTable1646488331484 implements MigrationInterface {
    name = 'teamTable1646488331484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "points" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "roomId" integer, CONSTRAINT "REL_e1aba98ce7f787700c8e35d5e4" UNIQUE ("roomId"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creator_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_1e89f1fd137dc7fea7242377e25" UNIQUE ("teamId")`);
        await queryRunner.query(`ALTER TABLE "game" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD "updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "UQ_0c94c735ea1a78192b1f20b61c8" UNIQUE ("creatorId")`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_e1aba98ce7f787700c8e35d5e4b" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_0c94c735ea1a78192b1f20b61c8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_e1aba98ce7f787700c8e35d5e4b"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "UQ_0c94c735ea1a78192b1f20b61c8"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_1e89f1fd137dc7fea7242377e25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "creator_id" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "team"`);
    }

}
