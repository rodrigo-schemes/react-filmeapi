import { CreateUserHandler } from './create-user.handler';
import { IUserRepository } from '../../../core/repository/user.repository';
import { User } from '../../../core/domain/user.entity';
import { CreateUserBuilder } from '../../../../tests/builders/features/create-user.builder';
import { makeUserRepositoryMock } from '../../../../tests/mocks/user-repository.mock';

describe('CreateUserHandler', () => {
	let handler: CreateUserHandler;
	let repository: jest.Mocked<IUserRepository>;

	beforeEach(() => {
		repository = makeUserRepositoryMock();
		handler = new CreateUserHandler(repository);
	});

	it('deve falhar se o e-mail já estiver cadastrado', async () => {
		const command = new CreateUserBuilder().build();
		repository.findByEmail.mockResolvedValue(
			User.create(command.name, command.email, command.password),
		);

		const result = await handler.execute(command);

		expect(result.isSuccess).toBe(false);
		expect(result.errors).toContain('E-mail já cadastrado');
		expect(repository.create).not.toHaveBeenCalled();
	});

	it('deve criar usuário com sucesso', async () => {
		const command = new CreateUserBuilder().build();
		repository.findByEmail.mockResolvedValue(null);

		const fakeUser = User.create(command.name, command.email, command.password);
		fakeUser.id = 'fake-id-123';

		repository.create.mockResolvedValue(fakeUser);

		const result = await handler.execute(command);

		expect(result.isSuccess).toBe(true);
		expect(result.data).toEqual({ id: 'fake-id-123' });
		expect(repository.create).toHaveBeenCalledWith(expect.any(User));
	});
});
