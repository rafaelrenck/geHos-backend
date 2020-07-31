import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
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

    const session = await createSession.execute({
      username: 'teste',
      password: '1515',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      createSession.execute({
        username: 'teste',
        password: '1515',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
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
      createSession.execute({
        username: 'teste',
        password: '1516',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
