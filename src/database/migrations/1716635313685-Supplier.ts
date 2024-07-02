import { MigrationInterface, QueryRunner } from 'typeorm';

export class Supplier1716635313685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE supplier(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name NVARCHAR(100),
            company NVARCHAR(100)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE supplier`);
  }
}
