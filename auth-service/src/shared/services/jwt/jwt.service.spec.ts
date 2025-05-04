import { JwtService } from './jwt.service';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked.jwt.token'),
}));

describe('JwtService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, JWT_SECRET: 'test-secret' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('deve gerar um token com sucesso quando JWT_SECRET está definido', () => {
    const payload = {
      userId: faker.string.uuid(),
      email: faker.internet.email(),
    };

    const result = JwtService.generateToken(payload);

    expect(result.token).toBe('mocked.jwt.token');
    expect(typeof result.expiresAt).toBe('number');
    expect(jwt.sign).toHaveBeenCalledWith(
      payload,
      'your_jwt_secret_key',
      expect.objectContaining({ expiresIn: expect.any(Number) })
    );
  });

  it('deve lançar erro quando JWT_SECRET não está definida', () => {
    delete process.env.JWT_SECRET;

    // Precisa importar a classe novamente pois JWT_SECRET é lido no escopo superior
    jest.resetModules();
    const { JwtService: UnsafeJwtService } = require('./jwt.service');

    expect(() => {
      UnsafeJwtService.generateToken({
        userId: faker.string.uuid(),
        email: faker.internet.email(),
      });
    }).toThrow('JWT_SECRET is not defined in environment variables');
  });
});
