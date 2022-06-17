import { MigrationInterface, QueryRunner } from "typeorm";

export class decimalsModification1655464770005 implements MigrationInterface {
    name = 'decimalsModification1655464770005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" ALTER COLUMN "temperature" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" ALTER COLUMN "temperature" TYPE numeric(2,0)`);
    }

}
