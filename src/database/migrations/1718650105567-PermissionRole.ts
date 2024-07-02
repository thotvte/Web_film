import { MigrationInterface, QueryRunner } from 'typeorm';

export class PermissionRole1718650105567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE permission_role(
        role_id INT ,
        permission_id INT,
        FOREIGN KEY(role_id) REFERENCES role(id),
        FOREIGN KEY(permission_id) REFERENCES permission(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE permission_role`);
  }
}
