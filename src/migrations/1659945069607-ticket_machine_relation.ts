import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketMachineRelation1659945069607 implements MigrationInterface {
    name = 'ticketMachineRelation1659945069607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD "parking_machine_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_fc45ced01aafb3378990475b94f" FOREIGN KEY ("parking_machine_id") REFERENCES "parking_machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_fc45ced01aafb3378990475b94f"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "parking_machine_id"`);
    }

}
