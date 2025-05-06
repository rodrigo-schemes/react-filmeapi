import { inject, injectable } from 'tsyringe';
import { ListUsersRequest } from './list-users.validator';
import { ListUsersResponse } from './list-users.response';
import { IUserRepository } from '../../../core/repository/user.repository';
import { PaginationResponse } from '../../../shared/utils/pagination/pagination.response';
import { Result } from '../../../shared/utils/result/result-pattern';

@injectable()
export class ListUsersHandler {
	constructor(
		@inject('UserRepository')
		private readonly repository: IUserRepository,
	) {}

	async execute(query: ListUsersRequest): Promise<Result<PaginationResponse<ListUsersResponse>>> {
		const { page, limit } = query;

		const [users, total] = await Promise.all([
			this.repository.findAll({ page, limit }),
			this.repository.count(),
		]);

		const itens: ListUsersResponse[] = users.map((user) => ({
			id: user.id!,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt!,
		}));

		return Result.ok(
			PaginationResponse.from({
				itens,
				total,
				page,
				limit,
			}),
		);
	}
}
