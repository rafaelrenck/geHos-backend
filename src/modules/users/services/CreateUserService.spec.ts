import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      username: 'teste',
      password: '1515',
      name: 'Usuário Teste',
      hr_id: 1111,
      cpf: '000.000.000-00',
      board: 'CRM',
      board_uf: 'RS',
      board_id: 9999,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an username already taken', async () => {
    await createUser.execute({
      username: 'teste',
      password: '1515',
      name: 'Usuário Teste',
      hr_id: 1111,
      cpf: '000.000.000-00',
      board: 'CRM',
      board_uf: 'RS',
      board_id: 9999,
    });

    await expect(
      createUser.execute({
        username: 'teste',
        password: '1515',
        name: 'Usuário Teste',
        hr_id: 1111,
        cpf: '000.000.000-00',
        board: 'CRM',
        board_uf: 'RS',
        board_id: 9999,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
