import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cinema1715338727708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE cinema(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name NVARCHAR(100),
            number_of_seats INT,
            created_at DATETIME NULL,
            deleted_at DATETIME NULL,
            updated_at DATETIME NULL,
            status INT
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cinema`);
  }
}
