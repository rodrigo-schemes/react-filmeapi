import { PaginationRequest } from '../../../shared/utils/pagination/pagination.request';

export class ListUsersRequest extends PaginationRequest {
	constructor(params?: Partial<ListUsersRequest>) {
		super(params);
	}
}
