import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

// import UsersSeed from '@shared/infra/typeorm/seeds/users.seed';

export default class SeedFirstUserWithAdminPermission1596028646772
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = {
      username: 'rafael.renck',
      password: `${await hash('1234', 8)}`,
      name: 'Rafael Renck da Silva',
      email: 'rafael@hsvosorio.com.br',
      hr_id: 716,
      cpf: '001.946.950-00',
    };

    const group = {
      group: 'Admin',
      description: 'Administradores do sistema',
    };

    const newUser = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(user)
      .returning('id')
      .execute();

    const newGroup = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('groups')
      .values(group)
      .returning('id')
      .execute();

    const userGroup = {
      user_id: `${newUser.identifiers[0].id}`,
      group_id: `${newGroup.identifiers[0].id}`,
    };

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_groups')
      .values(userGroup)
      .execute();
  }

  public async down(_: QueryRunner): Promise<void> {
    // do nothing
  }
}
