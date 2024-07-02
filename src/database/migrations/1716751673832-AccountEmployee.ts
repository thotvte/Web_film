import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountEmployee1716751673832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE account_employee(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username NVARCHAR(50),
                password NVARCHAR(50),
                email NVARCHAR(50),
                role_id INT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NULL,
                deleted_at DATETIME NULL,
                FOREIGN KEY(role_id) REFERENCES role(id)
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE account_employee`);
  }
}
