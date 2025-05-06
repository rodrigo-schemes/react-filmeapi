import { faker } from '@faker-js/faker';
import { User } from '../../../src/core/domain/user.entity';

export class UserBuilder {
	private _id = faker.database.mongodbObjectId();
	private _name = faker.person.fullName();
	private _email = faker.internet.email();
	private _password = faker.internet.password();
	private _createdAt = faker.date.past();

	withId(id: string): UserBuilder {
		this._id = id;
		return this;
	}

	withName(name: string): UserBuilder {
		this._name = name;
		return this;
	}

	withEmail(email: string): UserBuilder {
		this._email = email;
		return this;
	}

	withPassword(password: string): UserBuilder {
		this._password = password;
		return this;
	}

	withCreatedAt(date: Date): UserBuilder {
		this._createdAt = date;
		return this;
	}

	build(): User {
		const user = User.restore({
			id: this._id,
			name: this._name,
			email: this._email,
			password: this._password,
			createdAt: this._createdAt,
		});
		return user;
	}
}
