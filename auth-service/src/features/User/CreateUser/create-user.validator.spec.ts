import { faker } from '@faker-js/faker';
import { CreateUserValidator } from './create-user.validator';

describe('CreateUserValidator', () => {
	it('deve ser válido com dados corretos', () => {
		const validData = {
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password({ length: 10 }),
		};

		const result = CreateUserValidator.safeParse(validData);
		expect(result.success).toBe(true);
	});

	it('deve falhar quando o nome estiver vazio', () => {
		const result = CreateUserValidator.safeParse({
			name: '',
			email: faker.internet.email(),
			password: faker.internet.password({ length: 10 }),
		});

		expect(result.success).toBe(false);
		expect(result.error!.issues[0].message).toBe('Nome é obrigatório');
	});

	it('deve falhar quando o e-mail for inválido', () => {
		const result = CreateUserValidator.safeParse({
			name: faker.person.fullName(),
			email: 'email-invalido',
			password: faker.internet.password({ length: 10 }),
		});

		expect(result.success).toBe(false);
		expect(result.error!.issues[0].message).toBe('E-mail inválido');
	});

	it('deve falhar quando a senha for menor que 6 caracteres', () => {
		const result = CreateUserValidator.safeParse({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.string.alpha({ length: 3 }),
		});

		expect(result.success).toBe(false);
		expect(result.error!.issues[0].message).toBe('Senha deve ter no mínimo 6 caracteres');
	});
});
