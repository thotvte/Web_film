import { MigrationInterface, QueryRunner } from 'typeorm';

export class BlogMovie1719312262567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE blog_movie(
        movie_id INT ,
        blog_id INT ,
        FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (blog_id ) REFERENCES blog (id) ON DELETE CASCADE ON UPDATE CASCADE

    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE blog_movie`);
  }
}
