import { MigrationInterface, QueryRunner } from 'typeorm';

export class Employee1716755434499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE employee(
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name NVARCHAR(10),
            last_name NVARCHAR(50),
            birth_date DATE,
            email NVARCHAR(100),
            phone_number NVARCHAR(11),
            hire_date DATE,
            salary DECIMAL(10,2),
            account_employee_id INT,
            FOREIGN KEY (account_employee_id) REFERENCES account_employee(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE employee`);
  }
}
