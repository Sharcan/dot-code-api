import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createHistoricGamesTable1646068646083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "historic_games",
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
                    name: "user_id",
                    type: "int"
                },
                {
                    name: "room_name",
                    type: "varchar"
                },
                {
                    name: "team_name",
                    type: "varchar"
                },
                {
                    name: "result",
                    type: "enum",
                    enum: ["win", "lose"]
                },
                {
                  name: 'started_at',
                  type: 'timestamp'
                },
                {
                  name: 'finished_at',
                  type: 'timestamp'
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()'
                },
            ]
        }), true);

        await queryRunner.createForeignKey("historic_games", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("historic_games");

        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("historic_games", userForeignKey);

        await queryRunner.dropTable("historic_games");
    }

}
