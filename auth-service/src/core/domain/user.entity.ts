export class User {
	public createdAt?: Date;

	constructor(
		public name: string,
		public email: string,
		public password: string,
		public id?: string,
		createdAt?: Date,
	) {
		this.createdAt = createdAt;
	}

	static create(name: string, email: string, password: string): User {
		return new User(name, email, password);
	}

	static restore(props: {
		id: string;
		name: string;
		email: string;
		password: string;
		createdAt: Date;
	}): User {
		return new User(props.name, props.email, props.password, props.id, props.createdAt);
	}
}
