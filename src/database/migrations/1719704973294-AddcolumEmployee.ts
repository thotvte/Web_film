import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddcolumEmployee1719704973294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE employee
            ADD COLUMN city NVARCHAR(20), 
            ADD COLUMN country NVARCHAR(20)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE employee
            DROP COLUMN city,
            DROP COLUMN country
        `);
  }
}
