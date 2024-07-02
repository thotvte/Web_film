import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtColumnSeat1716016032993
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE seat MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE seat ALTER COLUMN created_at DROP DEFAULT`,
    );
  }
}
