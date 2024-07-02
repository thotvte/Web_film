import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seat1715339205693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE seat(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name NVARCHAR(100),
      type_seat_id INT,
      row_name NVARCHAR(50),
      column_name NVARCHAR(50),
      cinema_id INT,
      created_at DATETIME NULL,
      updated_at DATETIME NULL,
      deleted_at DATETIME NULL,
      status INT,
      FOREIGN KEY (cinema_id) REFERENCES cinema(id)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE seat`);
  }
}
