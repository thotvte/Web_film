import { MigrationInterface, QueryRunner } from 'typeorm';

export class PermissionAccountEmp1718724692171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE permission_accountemp(
        accountemp_id INT,
        permission_id INT,
        FOREIGN KEY(accountEmp_id) REFERENCES account_employee(id),
        FOREIGN KEY(permission_id) REFERENCES permission(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE permission_accountEmp`);
  }
}
