import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketEntityZoneRelation1654965696241 implements MigrationInterface {
    name = 'ticketEntityZoneRelation1654965696241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "license_plate" character varying NOT NULL, "issued_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2022-06-11T16:41:37.981Z"', "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "zone_id" uuid, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_3795f20551d11643bf8c439d579" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_3795f20551d11643bf8c439d579"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }

}
