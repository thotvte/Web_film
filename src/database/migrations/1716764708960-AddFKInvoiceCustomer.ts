import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKInvoiceCustomer1716764708960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice 
                        ADD CONSTRAINT FK_invoice_customer
                        FOREIGN KEY (customer_id) 
                        REFERENCES customer(id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice 
                    DROP FOREIGN KEY FK_invoice_customer
                    `);
  }
}
