import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnTicket1716553120131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket 
        DROP COLUMN quantity_seat,
        DROP COLUMN status; `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket 
    ADD COLUMN quantity_seat INT,
    ADD COLUMN status INT;`);
  }
}
