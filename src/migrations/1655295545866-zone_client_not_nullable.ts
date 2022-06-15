import { MigrationInterface, QueryRunner } from "typeorm";

export class zoneClientNotNullable1655295545866 implements MigrationInterface {
    name = 'zoneClientNotNullable1655295545866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-15T12:19:07.496Z"'`);
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "FK_fe93525d97616feb04ceec87658"`);
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "client_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "FK_fe93525d97616feb04ceec87658" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "FK_fe93525d97616feb04ceec87658"`);
        await queryRunner.query(`ALTER TABLE "zones" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "FK_fe93525d97616feb04ceec87658" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-15 14:14:07.306+02'`);
    }

}
