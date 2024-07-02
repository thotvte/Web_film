import { MigrationInterface, QueryRunner } from 'typeorm';

export class Commen1719313268828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE comment(
        id INT AUTO_INCREMENT PRIMARY KEY,
        movie_id INT ,
        customer_id INT,
        employee_id INT,
        blog_id INT ,
        comment NVARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL,
        deleted_at DATETIME NULL,
        FOREIGN KEY (movie_id) REFERENCES movies(id),
        FOREIGN KEY (customer_id)  REFERENCES customer(id),
        FOREIGN KEY (employee_id) REFERENCES employee(id),
        FOREIGN KEY (blog_id) REFERENCES blog(id)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP COLUMN comment`);
  }
}
