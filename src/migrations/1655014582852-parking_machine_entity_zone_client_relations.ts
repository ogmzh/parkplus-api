import { MigrationInterface, QueryRunner } from "typeorm";

export class parkingMachineEntityZoneClientRelations1655014582852 implements MigrationInterface {
    name = 'parkingMachineEntityZoneClientRelations1655014582852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parking_machines" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zone_id" uuid, "client_id" uuid, CONSTRAINT "PK_411129f7fbda576ba9a7c44e00a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-12T06:16:24.858Z"'`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_4766ef16d39a85e2a7e22521870" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4"`);
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_4766ef16d39a85e2a7e22521870"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-11 18:41:37.981+02'`);
        await queryRunner.query(`DROP TABLE "parking_machines"`);
    }

}
