
import { faker } from '@faker-js/faker';
import { LoginUserValidator } from './login-user.validator';

describe('LoginUserValidator', () => {
  it('deve ser válido com dados corretos', () => {
    const validData = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    };

    const result = LoginUserValidator.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('deve falhar quando o e-mail for inválido', () => {
    const result = LoginUserValidator.safeParse({
      email: 'email-invalido',
      password: faker.internet.password({ length: 10 }),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('E-mail inválido');
    }
  });

  it('deve falhar quando a senha estiver vazia', () => {
    const result = LoginUserValidator.safeParse({
      email: faker.internet.email(),
      password: ''
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Senha é obrigatória');
    }
  });
});
