import { IUserRepository } from '../../src/core/repository/user.repository';
import { UserBuilder } from '../builders/domain/user.builder';

export const makeUserRepositoryMock = (): jest.Mocked<IUserRepository> => {
	const users = [
		new UserBuilder().withId('1').withName('João').build(),
		new UserBuilder().withId('2').withName('Maria').build(),
	];

	return {
		findAll: jest.fn().mockResolvedValue(users),
		count: jest.fn().mockResolvedValue(users.length),
		create: jest.fn(),
		findByEmail: jest.fn(),
	};
};
