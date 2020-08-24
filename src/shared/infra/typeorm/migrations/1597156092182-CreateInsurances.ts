import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInsurances1597156092182
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'insurances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'int',
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'insurance',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('insurances');
  }
}
