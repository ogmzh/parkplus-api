import { MigrationInterface, QueryRunner } from "typeorm";

export class zonePriceNumberDecimal1655458346369 implements MigrationInterface {
    name = 'zonePriceNumberDecimal1655458346369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(6,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(2,0)`);
    }

}
