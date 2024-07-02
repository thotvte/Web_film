import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtColumnGenre1716015885330
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE genres MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE genres ALTER COLUMN created_at DROP DEFAULT`,
    );
  }
}
