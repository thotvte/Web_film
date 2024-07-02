import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeliveryBill1716745342855 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE delivery_bill(
            id INT AUTO_INCREMENT PRIMARY KEY,
            reason NVARCHAR(255),
            employee_id INT,
            status INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE delivery_bill`);
  }
}
