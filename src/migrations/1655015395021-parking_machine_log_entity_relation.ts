import { MigrationInterface, QueryRunner } from "typeorm";

export class parkingMachineLogEntityRelation1655015395021 implements MigrationInterface {
    name = 'parkingMachineLogEntityRelation1655015395021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_machine_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "taken_at" TIMESTAMP WITH TIME ZONE NOT NULL, "temperature" integer NOT NULL, "machine_id" uuid, CONSTRAINT "PK_49742d009074b2382097dde16cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-12T06:29:56.589Z"'`);
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" ADD CONSTRAINT "FK_ef57202478bf3f2b851309e0b91" FOREIGN KEY ("machine_id") REFERENCES "parking_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machine_logs" DROP CONSTRAINT "FK_ef57202478bf3f2b851309e0b91"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-12 08:16:24.858+02'`);
        await queryRunner.query(`DROP TABLE "parking_machine_logs"`);
    }

}
