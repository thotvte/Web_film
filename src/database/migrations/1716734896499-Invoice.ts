import { MigrationInterface, QueryRunner } from 'typeorm';

export class Invoice1716734896499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE invoice(
            id INT AUTO_INCREMENT PRIMARY KEY,
            total DECIMAL(10,2),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            discount FLOAT,
            employee_id INT,
            customer_id INT
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE invoice`);
  }
}
