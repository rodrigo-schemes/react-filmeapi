import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { LoginUserRequest } from './login-user.request';
import { LoginUserResponse } from './login-user.response';
import { LoginUserHandler } from './login-user.handler';
import { Result } from '../../../shared/utils/result/result-pattern';

export const LoginUserController = {
	login: async (req: Request, res: Response<Result<LoginUserResponse>>): Promise<void> => {
		const handler = container.resolve(LoginUserHandler);
		const command: LoginUserRequest = req.body;

		const result = await handler.execute(command);

		result.isSuccess ? res.status(200).json(result) : res.status(400).json(result);
	},
};
