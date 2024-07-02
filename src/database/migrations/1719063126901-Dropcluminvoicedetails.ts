import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dropcluminvoicedetails1719063126901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice_detail
        DROP COLUMN status
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice_detail
        ADD COLUMN status INT
        `);
  }
}
