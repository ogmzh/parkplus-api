import { MigrationInterface, QueryRunner } from "typeorm";

export class datesBeforeInsert1655451188253 implements MigrationInterface {
    name = 'datesBeforeInsert1655451188253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" ADD "temperature" numeric(2,0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-15 14:43:27.158+02'`);
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" ADD "temperature" integer NOT NULL`);
    }

}
