import { MigrationInterface, QueryRunner } from "typeorm";

export class relationsRename1655283689760 implements MigrationInterface {
    name = 'relationsRename1655283689760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_users" DROP CONSTRAINT "FK_619ef807aee3c9475fba5a1d25e"`);
        await queryRunner.query(`ALTER TABLE "cities_addresses" DROP CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '"2022-06-15T09:01:32.146Z"'`);
        await queryRunner.query(`ALTER TABLE "client_users" ADD CONSTRAINT "FK_764041cde5462d563998915756e" FOREIGN KEY ("employer_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities_addresses" ADD CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities_addresses" DROP CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd"`);
        await queryRunner.query(`ALTER TABLE "client_users" DROP CONSTRAINT "FK_764041cde5462d563998915756e"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "issued_at" SET DEFAULT '2022-06-14 13:24:59.492+02'`);
        await queryRunner.query(`ALTER TABLE "cities_addresses" ADD CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_users" ADD CONSTRAINT "FK_619ef807aee3c9475fba5a1d25e" FOREIGN KEY ("employer_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
