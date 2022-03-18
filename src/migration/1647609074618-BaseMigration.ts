import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseMigration1647609074618 implements MigrationInterface {
    name = 'BaseMigration1647609074618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "mode" character varying, "name" character varying NOT NULL, "pin" character varying NOT NULL, "access" character varying NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, "game_id" integer, CONSTRAINT "REL_6dfeeefd28618a1351a1a1a917" UNIQUE ("owner_id"), CONSTRAINT "REL_7fb910c4989cd7de4e2e05fb7a" UNIQUE ("game_id"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "points" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "room_id" integer, CONSTRAINT "REL_3ddf8a30b99815c84f01849dcf" UNIQUE ("room_id"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "socket_id" character varying NOT NULL, "pseudo" character varying, "email" character varying, "password" character varying, "is_guest" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "room_id" integer, "team_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9416d08fb276a62be271c9a3c2" UNIQUE ("room_id"), CONSTRAINT "REL_155dbc144ff2bd4713fdf1f6c7" UNIQUE ("team_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "type" integer NOT NULL, "total_to_win" integer NOT NULL, "access" character varying NOT NULL, "language" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer, CONSTRAINT "REL_1f085438e7c67754389f6b459f" UNIQUE ("creator_id"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historic_game" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "room_name" character varying NOT NULL, "team_name" character varying NOT NULL, "result" character varying NOT NULL, "started_at" TIMESTAMP NOT NULL, "finished_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_c3cd9ba756e81a8e82e4b02c99" UNIQUE ("user_id"), CONSTRAINT "PK_ec297b17a83b2745b5d6630efd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_6dfeeefd28618a1351a1a1a9171" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_7fb910c4989cd7de4e2e05fb7a9" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_3ddf8a30b99815c84f01849dcfa" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9416d08fb276a62be271c9a3c21" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_155dbc144ff2bd4713fdf1f6c77" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_1f085438e7c67754389f6b459f7" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historic_game" ADD CONSTRAINT "FK_c3cd9ba756e81a8e82e4b02c994" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historic_game" DROP CONSTRAINT "FK_c3cd9ba756e81a8e82e4b02c994"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_1f085438e7c67754389f6b459f7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_155dbc144ff2bd4713fdf1f6c77"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9416d08fb276a62be271c9a3c21"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_3ddf8a30b99815c84f01849dcfa"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_7fb910c4989cd7de4e2e05fb7a9"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_6dfeeefd28618a1351a1a1a9171"`);
        await queryRunner.query(`DROP TABLE "historic_game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
