import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFKSeatGenreSeat1715403362174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE seat
        ADD CONSTRAINT fk_genre_seat_seat FOREIGN KEY (type_seat_id) REFERENCES type_seat(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE seat
        DROP FOREIGN KEY fk_genre_seat_seat
    `);
  }
}
