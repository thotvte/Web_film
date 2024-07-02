import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductItemProduct1716705199388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE product_items_products(
            product_item_id INT,
            product_id INT,
            FOREIGN KEY (product_item_id) REFERENCES product_item(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product_items_products`);
  }
}
