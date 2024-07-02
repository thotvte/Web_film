import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ticket1716358270153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE ticket (
        id INT AUTO_INCREMENT PRIMARY KEY,
        total DECIMAL(10,2) DEFAULT 0,
        schedule DATETIME ,
        name_movie NVARCHAR(150),
        quantity_seat INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL,
        deleted_at DATETIME NULL,
        status INT
    )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE ticket
    `);
  }
}
