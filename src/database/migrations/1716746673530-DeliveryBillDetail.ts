import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeliveryBillDetail1716746673530 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE delivery_bill_detail(
            id INT AUTO_INCREMENT PRIMARY KEY ,
            quantity INT ,
            unit_price DECIMAL(10,1),
            delivery_bill_id INT,
            product_item_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,
            FOREIGN KEY (delivery_bill_id) REFERENCES delivery_bill(id),
            FOREIGN KEY (product_item_id) REFERENCES product_item(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE delivery_bill_detail`);
  }
}
