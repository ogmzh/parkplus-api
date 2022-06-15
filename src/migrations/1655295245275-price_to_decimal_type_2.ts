import { MigrationInterface, QueryRunner } from "typeorm";

export class priceToDecimalType21655295245275 implements MigrationInterface {
    name = 'priceToDecimalType21655295245275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-15T12:14:07.306Z"'`);
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(2,0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(2,2)`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-15 14:11:03.236+02'`);
    }

}
