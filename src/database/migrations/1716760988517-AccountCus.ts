import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountCus1716760988517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE account_cus(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username NVARCHAR(50),
                password NVARCHAR(50),
                email NVARCHAR(50),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NULL,
                deleted_at DATETIME NULL
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE account_cus`);
  }
}
