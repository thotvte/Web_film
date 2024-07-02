import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTicket1716553763913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket 
    ADD COLUMN seat_id INT,
    ADD CONSTRAINT fk_seat
    FOREIGN KEY (seat_id) 
    REFERENCES seat(id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE ticket 
    DROP COLUMN seat_id ,
    DROP COLUMN ticket_details_id `);
  }
}
