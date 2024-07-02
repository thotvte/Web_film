import { MigrationInterface, QueryRunner } from 'typeorm';

export class Customer1716762655656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE customer(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    first_name NVARCHAR(10),
                    last_name NVARCHAR(50),
                    birth_date DATE,
                    email NVARCHAR(100),
                    phone_number NVARCHAR(11),
                    adderss NVARCHAR(100),
                    city NVARCHAR(20),
                    country NVARCHAR(20),
                    account_cus_id INT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME NULL,
                    deleted_at DATETIME NULL,
                    FOREIGN KEY (account_cus_id) REFERENCES account_cus(id)
                )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE customer`);
  }
}
