import { Request, Response } from 'express';
import { CreateUserRequest } from './create-user.request';
import { CreateUserResponse } from './create-user.response';
import { container } from 'tsyringe';
import { CreateUserHandler } from './create-user.handler';
import { Result } from '../../../shared/utils/result/result-pattern';

export const CreateUserController = {
	create: async (req: Request, res: Response<Result<CreateUserResponse>>): Promise<void> => {
		const handler = container.resolve(CreateUserHandler);
		const command: CreateUserRequest = req.body;

		const result = await handler.execute(command);

		result.isSuccess ? res.status(201).json(result) : res.status(400).json(result);
	},
};
