import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenreSeat1715400772877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE type_seat(
        id INT AUTO_INCREMENT PRIMARY KEY,
        type_chair NVARCHAR(100),
        quantity INT,
        created_at DATETIME NULL,
        deleted_at DATETIME NULL,
        updated_at DATETIME NULL,
        status INT
        
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE type_seat`);
  }
}
