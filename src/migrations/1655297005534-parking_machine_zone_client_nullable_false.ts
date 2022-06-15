import { MigrationInterface, QueryRunner } from "typeorm";

export class parkingMachineZoneClientNullableFalse1655297005534 implements MigrationInterface {
    name = 'parkingMachineZoneClientNullableFalse1655297005534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-15T12:43:27.158Z"'`);
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_4766ef16d39a85e2a7e22521870"`);
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4"`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ALTER COLUMN "zone_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ALTER COLUMN "client_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_4766ef16d39a85e2a7e22521870" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4"`);
        await queryRunner.query(`ALTER TABLE "parking_machines" DROP CONSTRAINT "FK_4766ef16d39a85e2a7e22521870"`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ALTER COLUMN "zone_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_0a40dae2946ff1554bb7424bce4" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parking_machines" ADD CONSTRAINT "FK_4766ef16d39a85e2a7e22521870" FOREIGN KEY ("zone_id") REFERENCES "zones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-15 14:19:07.496+02'`);
    }

}
