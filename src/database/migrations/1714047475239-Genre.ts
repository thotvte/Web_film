import { MigrationInterface, QueryRunner } from 'typeorm';

export class Genre1714047475239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE genres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name NVARCHAR(255),
        created_at DATETIME NULL,
        deleted_at DATETIME NULL,
        updated_at DATETIME NULL
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE genres`);
  }
}
