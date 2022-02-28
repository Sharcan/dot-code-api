import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createRoomsTable1646067984057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rooms",
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
                    name: "owner_id",
                    type: "int"
                },
                {
                    name: "game_id",
                    type: "int"
                },
                {
                    name: "mode",
                    type: "enum",
                    enum: ["solo", "multi", "vs"]
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "code",
                    type: "varchar"
                },
                {
                    name: "access",
                    type: "enum",
                    enum: ["public", "private"]
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["on", "off"]
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

        await queryRunner.createForeignKey("rooms", new TableForeignKey({
            columnNames: ["owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL"
        }));

        await queryRunner.createForeignKey("rooms", new TableForeignKey({
            columnNames: ["game_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "games",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("rooms");

        const ownerForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("owner_id") !== -1);
        await queryRunner.dropForeignKey("rooms", ownerForeignKey);

        const gameForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("game_id") !== -1);
        await queryRunner.dropForeignKey("rooms", gameForeignKey);

        await queryRunner.dropTable("rooms");
    }

}
