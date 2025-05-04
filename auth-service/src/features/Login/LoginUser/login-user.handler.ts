import { Result } from '../../../shared/result-pattern';
import { IUserRepository } from '../../../core/repository/user.repository';
import { inject, injectable } from 'tsyringe';
import { LoginUserResponse } from './login-user.response';
import { LoginUserRequest } from './login-user.request';
import bcrypt from 'bcrypt';
import { JwtService } from '../../../shared/services/jwt/jwt.service';

@injectable()
export class LoginUserHandler {
	constructor(
		@inject('UserRepository')
		private readonly repository: IUserRepository,
	) {}

	async execute(command: LoginUserRequest): Promise<Result<LoginUserResponse>> {
		const { email, password } = command;
		const user = await this.repository.findByEmail(email);

		if (!user) {
			return Result.fail(['Credenciais inválidas']);
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return Result.fail(['Credenciais inválidas']);
		}

		const { token, expiresAt } = JwtService.generateToken({
			userId: user.id!,
			email: user.email,
		});

		return Result.ok<LoginUserResponse>({
			name: user.name,
			email: user.email,
			token: token,
			expiresAt: expiresAt,
		});
	}
}
