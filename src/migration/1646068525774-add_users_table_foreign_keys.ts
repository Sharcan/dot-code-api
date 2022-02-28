import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class addUsersTableForeignKeys1646068525774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["room_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "rooms",
            onDelete: "SET NULL"
        }));

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["team_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "teams",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");

        const roomForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("room_id") !== -1);
        await queryRunner.dropForeignKey("users", roomForeignKey);

        const teamForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("team_id") !== -1);
        await queryRunner.dropForeignKey("users", teamForeignKey);
    }

}
