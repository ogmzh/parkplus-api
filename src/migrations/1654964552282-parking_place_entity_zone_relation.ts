import { MigrationInterface, QueryRunner } from "typeorm";

export class parkingPlaceEntityZoneRelation1654964552282 implements MigrationInterface {
    name = 'parkingPlaceEntityZoneRelation1654964552282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_places" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_taken" boolean NOT NULL, "zone_id" uuid, CONSTRAINT "PK_a7613d567c933556e36e99fb215" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "parking_places" ADD CONSTRAINT "FK_b6547d8c33f296cadbb6c268882" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_places" DROP CONSTRAINT "FK_b6547d8c33f296cadbb6c268882"`);
        await queryRunner.query(`DROP TABLE "parking_places"`);
    }

}
