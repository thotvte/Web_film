import { MigrationInterface, QueryRunner } from 'typeorm';

export class Blog1719311449190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE blog(
            id INT AUTO_INCREMENT PRIMARY KEY,
            title NVARCHAR(150),
            content NVARCHAR(555),
            customer_id INT,
            employee_id INT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,
            FOREIGN KEY (customer_id) REFERENCES customer(id),
            FOREIGN KEY (employee_id) REFERENCES employee(id)
        ) 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE blog`);
  }
}
