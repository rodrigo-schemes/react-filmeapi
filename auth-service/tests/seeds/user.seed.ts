import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { UserModel } from '../../src/infra/db/mongoose/repository/user.repository.mongo';

export class UserSeed {
	static async createUser(data?: Partial<{ name: string; email: string; password: string }>) {
		const name = data?.name || faker.person.fullName();
		const email = data?.email || faker.internet.email();
		const rawPassword = data?.password || faker.internet.password({ length: 8 });
		const password = await bcrypt.hash(rawPassword, 10);

		const user = await UserModel.create({
			name,
			email,
			password,
		});

		return { ...user.toObject(), rawPassword };
	}

	static async createMany(quantity: number) {
		const users = await Promise.all(
			Array.from({ length: quantity }).map(async () => {
				const name = faker.person.fullName();
				const email = faker.internet.email();
				const rawPassword = faker.internet.password({ length: 8 });
				const password = await bcrypt.hash(rawPassword, 10);

				return { name, email, password, rawPassword };
			}),
		);

		const created = await UserModel.insertMany(users.map(({ rawPassword, ...user }) => user));
		return created.map((u, i) => ({ ...u.toObject(), rawPassword: users[i].rawPassword }));
	}

	static async clear() {
		await UserModel.deleteMany({});
	}
}
