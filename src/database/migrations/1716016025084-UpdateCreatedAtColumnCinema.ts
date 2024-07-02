import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtColumnCinema1716016025084
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE cinema MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE cinema ALTER COLUMN created_at DROP DEFAULT`,
    );
  }
}
