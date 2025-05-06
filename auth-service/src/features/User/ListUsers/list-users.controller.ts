import { Request, Response } from 'express';
import { PaginationResponse } from '../../../shared/utils/pagination/pagination.response';
import { Result } from '../../../shared/utils/result/result-pattern';
import { ListUsersRequest } from './list-users.request';
import { ListUsersResponse } from './list-users.response';
import { container } from 'tsyringe';
import { ListUsersHandler } from './list-users.handler';

export const ListUsersController = {
	list: async (
		req: Request,
		res: Response<Result<PaginationResponse<ListUsersResponse>>>,
	): Promise<void> => {
		const handler = container.resolve(ListUsersHandler);
		const query = new ListUsersRequest(req.query);

		const result = await handler.execute(query);

		result.isSuccess ? res.status(200).json(result) : res.status(400).json(result);
	},
};
