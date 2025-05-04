import { LoginUserHandler } from './login-user.handler';
import { IUserRepository } from '../../../core/repository/user.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '../../../shared/services/jwt/jwt.service';
import { faker } from '@faker-js/faker';
import { LoginUserBuilder } from '../../../../tests/builders/login-user.builder';
import { User } from '../../../core/domain/user.entity';

describe('LoginUserHandler', () => {
  let handler: LoginUserHandler;
  let userRepository: jest.Mocked<IUserRepository>;

  const fakeToken = {
    token: 'jwt.token.simulado',
    expiresAt: 1234567890,
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    handler = new LoginUserHandler(userRepository);
  });

  it('deve falhar quando o e-mail não existir', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const request = new LoginUserBuilder().build();
    const result = await handler.execute(request);

    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain('Credenciais inválidas');
  });

  it('deve falhar quando a senha estiver incorreta', async () => {
    const login = new LoginUserBuilder().build();
    const fakeUser = User.create('Rodrigo', login.email, 'senha_hash');
    userRepository.findByEmail.mockResolvedValue(fakeUser);

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(false);

    const result = await handler.execute(login);

    expect(result.isSuccess).toBe(false);
    expect(result.errors).toContain('Credenciais inválidas');
  });

  it('deve retornar token quando login for bem-sucedido', async () => {
    const userId = faker.database.mongodbObjectId();
    const email = faker.internet.email();
    const name = faker.person.fullName();

    userRepository.findByEmail.mockResolvedValue({
      id: userId,
      name,
      email,
      password: await bcrypt.hash('validPassword123', 10),
    });

    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);
    jest.spyOn(JwtService, 'generateToken').mockReturnValue(fakeToken);

    const request = new LoginUserBuilder()
      .withEmail(email)
      .withPassword('validPassword123')
      .build();

    const result = await handler.execute(request);

    expect(result.isSuccess).toBe(true);
    expect(result.data).toEqual({
      name,
      email,
      token: 'jwt.token.simulado',
      expiresAt: 1234567890,
    });
  });
});
