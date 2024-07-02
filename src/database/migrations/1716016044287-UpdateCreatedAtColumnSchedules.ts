import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtColumnSchedules1716016044287
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE schedules MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE schedules ALTER COLUMN created_at DROP DEFAULT`,
    );
  }
}
