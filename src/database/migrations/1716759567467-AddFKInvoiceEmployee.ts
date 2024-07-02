import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKInvoiceEmployee1716759567467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice 
                ADD CONSTRAINT FK_invoice_employee
                FOREIGN KEY (employee_id) 
                REFERENCES employee(id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice 
            DROP FOREIGN KEY FK_invoice_employee
            `);
  }
}
