import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTeamsTable1646068278740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "teams",
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
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "points",
                    type: "int"
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

        await queryRunner.createForeignKey("teams", new TableForeignKey({
            columnNames: ["room_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "rooms",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("teams");

        const roomForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("room_id") !== -1);
        await queryRunner.dropForeignKey("teams", roomForeignKey);

        await queryRunner.dropTable("teams");
    }

}
