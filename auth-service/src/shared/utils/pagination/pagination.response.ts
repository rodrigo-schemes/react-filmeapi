export class PaginationResponse<T> {
	itens: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};

	private constructor(itens: T[], total: number, page: number, limit: number) {
		this.itens = itens;
		this.meta = {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		};
	}

	static from<T>(params: {
		itens: T[];
		total: number;
		page: number;
		limit: number;
	}): PaginationResponse<T> {
		const { itens, total, page = 1, limit = 10 } = params;
		return new PaginationResponse<T>(itens, total, page, limit);
	}
}
