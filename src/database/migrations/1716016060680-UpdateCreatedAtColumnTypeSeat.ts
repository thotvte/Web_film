import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCreatedAtColumnTypeSeat1716016060680
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE type_seat MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE type_seat ALTER COLUMN created_at DROP DEFAULT`,
    );
  }
}
