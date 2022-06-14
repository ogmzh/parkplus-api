import { MigrationInterface, QueryRunner } from "typeorm";

export class clientUserEmailUnique1655204839894 implements MigrationInterface {
    name = 'clientUserEmailUnique1655204839894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_users" ADD CONSTRAINT "UQ_1b08a71cf48cbbd139d4742d61a" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-14T11:07:21.621Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-12 08:29:56.589+02'`);
        await queryRunner.query(`ALTER TABLE "client_users" DROP CONSTRAINT "UQ_1b08a71cf48cbbd139d4742d61a"`);
    }

}
