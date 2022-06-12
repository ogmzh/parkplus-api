import { MigrationInterface, QueryRunner } from "typeorm";

export class citiesAddressesEntitiesRelation1654935155160 implements MigrationInterface {
    name = 'citiesAddressesEntitiesRelation1654935155160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "number" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cities_addresses" ("city_id" uuid NOT NULL, "address_id" uuid NOT NULL, CONSTRAINT "PK_f0abc4f8a90f3fe8605a9d9d2a5" PRIMARY KEY ("city_id", "address_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7810d746a8d40b5262496bbbdf" ON "cities_addresses" ("city_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_25146c5d20aac8c90bdf02c8cc" ON "cities_addresses" ("address_id") `);
        await queryRunner.query(`ALTER TABLE "cities_addresses" ADD CONSTRAINT "FK_7810d746a8d40b5262496bbbdf8" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cities_addresses" ADD CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities_addresses" DROP CONSTRAINT "FK_25146c5d20aac8c90bdf02c8ccd"`);
        await queryRunner.query(`ALTER TABLE "cities_addresses" DROP CONSTRAINT "FK_7810d746a8d40b5262496bbbdf8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25146c5d20aac8c90bdf02c8cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7810d746a8d40b5262496bbbdf"`);
        await queryRunner.query(`DROP TABLE "cities_addresses"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
