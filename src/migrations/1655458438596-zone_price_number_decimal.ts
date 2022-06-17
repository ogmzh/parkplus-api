import { MigrationInterface, QueryRunner } from "typeorm";

export class zonePriceNumberDecimal1655458438596 implements MigrationInterface {
    name = 'zonePriceNumberDecimal1655458438596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "price" TYPE numeric(6,2)`);
    }

}
