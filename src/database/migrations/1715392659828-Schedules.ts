import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedules1715392659828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE schedules(
            id INT AUTO_INCREMENT PRIMARY KEY,
            movie_id INT,
            cinema_id INT,
            start_time DATETIME,
            created_at DATETIME NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,
            status INT,
            FOREIGN KEY (movie_id) REFERENCES movies(id),
            FOREIGN KEY (cinema_id) REFERENCES cinema(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE schedules`);
  }
}
