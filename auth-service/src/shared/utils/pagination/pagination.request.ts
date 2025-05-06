export class PaginationRequest {
	page: number = 1;
	limit: number = 10;

	constructor(params?: Partial<PaginationRequest>) {
		if (params?.page) this.page = params.page;
		if (params?.limit) this.limit = params.limit;
	}
}
