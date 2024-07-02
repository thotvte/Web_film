import { MigrationInterface, QueryRunner } from 'typeorm';

export class Movie1714047296828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name NVARCHAR(255),
        actors NVARCHAR(255),
        duration INT,
        age_rating NVARCHAR(50),
        description NVARCHAR(255),
        Content NVARCHAR(1000),
        created_at DATETIME NULL,
        deleted_at DATETIME NULL,
        updated_at DATETIME NULL,
        status INT
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE movies`);
  }
}
