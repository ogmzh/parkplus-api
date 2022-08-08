import { MigrationInterface, QueryRunner } from "typeorm";

export class zoneMaxParkingSpots1659941916695 implements MigrationInterface {
    name = 'zoneMaxParkingSpots1659941916695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ADD "max_parking_spots" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "max_parking_spots"`);
    }

}
