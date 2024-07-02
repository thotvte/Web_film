import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumntickets1719414651368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket
        ADD COLUMN unit_price DECIMAL(10,2),
        ADD COLUMN quantity INT DEFAULT 1,
        ADD COLUMN schedules_id INT ,
        ADD COLUMN status INT DEFAULT 0,
        ADD CONSTRAINT FK_ticket_schedules FOREIGN KEY (schedules_id) REFERENCES schedules (id )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket
        DROP COLUMN unit_price ,
        DROP COLUMN quantity ,
        DROP CONSTRAINT FK_ticket_schedules,
        DROP COLUMN schedules_id  ,
        DROP COLUMN status
    `);
  }
}
