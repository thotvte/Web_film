import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvoiceDetail1716736908703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE invoice_detail(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name NVARCHAR(100),
            price DECIMAL(10,2),
            quantity INT,
            invoice_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,
            status INT ,
            FOREIGN KEY (invoice_id) REFERENCES invoice(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE invoice_detail`);
  }
}
