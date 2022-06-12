import { MigrationInterface, QueryRunner } from "typeorm";

export class zoneEntityClientRelation1654956765617 implements MigrationInterface {
    name = 'zoneEntityClientRelation1654956765617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "zones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "max_park_duration" integer NOT NULL, "parkTimeStart" TIME NOT NULL, "parkTimeEnd" TIME NOT NULL, "client_id" uuid, CONSTRAINT "PK_880484a43ca311707b05895bd4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "FK_fe93525d97616feb04ceec87658" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "FK_fe93525d97616feb04ceec87658"`);
        await queryRunner.query(`DROP TABLE "zones"`);
    }

}
