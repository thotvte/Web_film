import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1716667484209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE products(
                id INT AUTO_INCREMENT PRIMARY KEY,
                name NVARCHAR(100),
                price DECIMAL(10,2),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NULL,
                deleted_at DATETIME NULL,
                status INT
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE products `);
  }
}
