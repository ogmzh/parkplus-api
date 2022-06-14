import { MigrationInterface, QueryRunner } from 'typeorm';

export class clientsUsersEntitiesRelation1654935408028
  implements MigrationInterface
{
  name = 'clientsUsersEntitiesRelation1654935408028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "client_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "employer_id" uuid, CONSTRAINT "PK_fe74bfd4d01077395ee4204b553" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "client_users" ADD CONSTRAINT "FK_619ef807aee3c9475fba5a1d25e" FOREIGN KEY ("employer_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "client_users" DROP CONSTRAINT "FK_619ef807aee3c9475fba5a1d25e"`,
    );
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "client_users"`);
  }
}
