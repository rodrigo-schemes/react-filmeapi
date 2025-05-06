import { IUserRepository } from '../../../../core/repository/user.repository';
import { User } from '../../../../core/domain/user.entity';
import { model, Schema } from 'mongoose';
import { UserDocument } from '../document/user.document';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export const UserModel = model<UserDocument>('User', UserSchema);

export class UserRepository implements IUserRepository {
	async create(user: User): Promise<User> {
		const hashedPassword = await bcrypt.hash(user.password, 10);

		const created = await UserModel.create({
			name: user.name,
			email: user.email,
			password: hashedPassword,
		});

		return new User(created.name, created.email, created.password, created.id);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email });
		if (!user) return null;

		return new User(user.name, user.email, user.password, user.id);
	}

	async findAll({ page, limit }: { page: number; limit: number }): Promise<User[]> {
		const skip = (page - 1) * limit;

		const docs = await UserModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }).exec();

		return docs.map((doc) =>
			User.restore({
				id: doc._id.toString(),
				name: doc.name,
				email: doc.email,
				password: doc.password,
				createdAt: doc.createdAt,
			}),
		);
	}

	async count(): Promise<number> {
		return UserModel.countDocuments({});
	}
}
