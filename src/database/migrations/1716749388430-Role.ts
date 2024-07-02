import { MigrationInterface, QueryRunner } from 'typeorm';

export class Role1716749388430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE role(
            id INT AUTO_INCREMENT PRIMARY KEY,
            role_name NVARCHAR(50),
            description NVARCHAR(150)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE role`);
  }
}
