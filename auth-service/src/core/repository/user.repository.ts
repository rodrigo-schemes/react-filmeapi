import { User } from '../domain/user.entity';

export interface IUserRepository {
	create(user: User): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findAll(params: { page: number; limit: number }): Promise<User[]>;
	count(): Promise<number>;
}
