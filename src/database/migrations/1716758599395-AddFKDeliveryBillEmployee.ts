import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKDeliveryBillEmployee1716758599395
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE delivery_bill 
            ADD CONSTRAINT FK_delivery_bill_employee
            FOREIGN KEY (employee_id) 
            REFERENCES employee(id);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE delivery_bill 
        DROP FOREIGN KEY FK_delivery_bill_employee
        `);
  }
}
