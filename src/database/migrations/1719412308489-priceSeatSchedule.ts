import { MigrationInterface, QueryRunner } from 'typeorm';

export class PriceTypeSeatSchedule1719412308489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE price_seat_schedule(
        id INT AUTO_INCREMENT PRIMARY KEY,
        price DECIMAL(10,2),
        time_slot NVARCHAR(100),
        schedules_id INT,
        seat_id INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL,
        deleted_at DATETIME NULL,
        FOREIGN KEY(schedules_id) REFERENCES schedules(id),
        FOREIGN KEY(seat_id) REFERENCES seat(id)

    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE price_seat_schedule`);
  }
}
