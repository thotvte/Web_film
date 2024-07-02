import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductItem1716656805776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE product_item(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name NVARCHAR(100),
            description NVARCHAR(1000),
            stock INT,
            rating INT,
            image_url NVARCHAR(150),
            category_id INT,
            supplier_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,
            FOREIGN KEY (category_id) REFERENCES category (id),
            FOREIGN KEY (supplier_id) REFERENCES supplier (id)

        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product_item`);
  }
}
