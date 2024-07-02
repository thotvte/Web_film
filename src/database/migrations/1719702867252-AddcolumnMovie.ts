import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddcolumnMovie1719702867252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE movies 
        ADD COLUMN image NVARCHAR(100)    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE movies
        DROP COLUMN image
    `);
  }
}
