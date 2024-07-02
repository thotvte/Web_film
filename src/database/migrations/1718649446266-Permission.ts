import { MigrationInterface, QueryRunner } from 'typeorm';

export class Permission1718649446266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table permission(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name NVARCHAR(100),
        description NVARCHAR(255)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE permission`);
  }
}
