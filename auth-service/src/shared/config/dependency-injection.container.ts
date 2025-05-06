import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from '../../core/repository/user.repository';
import { UserRepository } from '../../infra/db/mongoose/repository/user.repository.mongo';
import { CreateUserHandler } from '../../features/User/CreateUser/create-user.handler';

export const registerDependencies = () => {
	container.register<IUserRepository>('UserRepository', {
		useClass: UserRepository,
	});
	container.register<CreateUserHandler>('CreateUserHandler', {
		useClass: CreateUserHandler,
	});
};
