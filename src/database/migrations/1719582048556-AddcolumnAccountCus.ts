import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddcolumnAccountCus1719582048556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE account_cus
        ADD COLUMN confirm_password NVARCHAR(50)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER COLUMN account_cus
        DROP COLUMN confirm_password
    `);
  }
}
