import { MigrationInterface, QueryRunner } from "typeorm";

export class zoneAddressesRelationshipParkTimeStartEndRename1654964181844 implements MigrationInterface {
    name = 'zoneAddressesRelationshipParkTimeStartEndRename1654964181844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "parkTimeStart"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "parkTimeEnd"`);
        await queryRunner.query(`ALTER TABLE "zones" ADD "park_time_start" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zones" ADD "park_time_end" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "zone_id" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_86639019aa02484ea7cf016466b" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_86639019aa02484ea7cf016466b"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "zone_id"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "park_time_end"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "park_time_start"`);
        await queryRunner.query(`ALTER TABLE "zones" ADD "parkTimeEnd" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zones" ADD "parkTimeStart" TIME NOT NULL`);
    }

}
