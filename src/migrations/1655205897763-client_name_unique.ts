import { MigrationInterface, QueryRunner } from "typeorm";

export class clientNameUnique1655205897763 implements MigrationInterface {
    name = 'clientNameUnique1655205897763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_99e921caf21faa2aab020476e44" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-14T11:24:59.492Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-14 13:07:21.621+02'`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_99e921caf21faa2aab020476e44"`);
    }

}
