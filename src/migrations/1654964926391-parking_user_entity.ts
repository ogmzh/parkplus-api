import { MigrationInterface, QueryRunner } from "typeorm";

export class parkingUserEntity1654964926391 implements MigrationInterface {
    name = 'parkingUserEntity1654964926391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_4581054301dade8b055cdb4e5c1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "parking_users"`);
    }

}
