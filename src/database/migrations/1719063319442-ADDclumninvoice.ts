import { MigrationInterface, QueryRunner } from 'typeorm';

export class ADDclumninvoice1719063319442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice
            ADD COLUMN status INT default 0 ,
            ADD COLUMN updated_at DATETIME NULL,
            ADD COLUMN deleted_at DATETIME NULL
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice
        DROP COLUMN status,
        DROP COLUMN updated_at,
        DROP COLUMN deleted_at
        `);
  }
}
