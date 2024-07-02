import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddcolumnDetail1718438357957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE invoice_detail
        ADD total DECIMAL(10,2)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE invoice_detail
        DROP COLUMN total
        `);
  }
}
