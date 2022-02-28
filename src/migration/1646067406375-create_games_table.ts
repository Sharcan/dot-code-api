import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createGamesTable1646067406375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "games",
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
                    name: "creator_id",
                    type: "int"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "type",
                    type: "enum",
                    enum: ["errors", "holes", "objectives"]
                },
                {
                    name: "total_to_wins",
                    type: "int"
                },
                {
                    name: "language",
                    type: "enum",
                    enum: ["FRA", "ENG", "ESP"]
                },
                {
                    name: "access",
                    type: "enum",
                    enum: ["public", "private"]
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

        await queryRunner.createForeignKey("games", new TableForeignKey({
            columnNames: ["creator_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("games");

        const creatorForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("creator_id") !== -1);
        await queryRunner.dropForeignKey("games", creatorForeignKey);

        await queryRunner.dropTable("games");
    }

}
