import { PaginationResponse } from './pagination.response';

describe('PaginationResponse', () => {
	it('deve criar response corretamente com os dados fornecidos', () => {
		const items = [{ id: 1 }, { id: 2 }];
		const total = 20;
		const page = 2;
		const limit = 5;

		const response = PaginationResponse.from({
			itens: items,
			total,
			page,
			limit,
		});

		expect(response.itens).toEqual(items);
		expect(response.meta).toEqual({
			total,
			page,
			limit,
			totalPages: 4,
		});
	});

	it('deve aplicar valores padrão se page e limit não forem fornecidos', () => {
		const items = [{ id: 1 }];
		const response = PaginationResponse.from({
			itens: items,
			total: 10,
			page: undefined as unknown as number,
			limit: undefined as unknown as number,
		});

		expect(response.meta.page).toBe(1);
		expect(response.meta.limit).toBe(10);
		expect(response.meta.totalPages).toBe(1);
	});
});
