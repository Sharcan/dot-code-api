import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1646066918641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "slug",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "room_id",
                    type: "int"
                },
                {
                    name: "team_id",
                    type: "int"
                },
                {
                    name: "socket_id",
                    type: "varchar"
                },
                {
                    name: "pseudo",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "is_guest",
                    type: "boolean"
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()'
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()'
                },
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
