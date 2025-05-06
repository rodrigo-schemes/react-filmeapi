import { PaginationRequest } from './pagination.request';

describe('PaginationRequest', () => {
	it('deve usar valores padrão se nenhum parâmetro for passado', () => {
		const req = new PaginationRequest();
		expect(req.page).toBe(1);
		expect(req.limit).toBe(10);
	});

	it('deve atribuir valores passados corretamente', () => {
		const req = new PaginationRequest({ page: 3, limit: 25 });
		expect(req.page).toBe(3);
		expect(req.limit).toBe(25);
	});

	it('deve manter o valor padrão se apenas page for passado', () => {
		const req = new PaginationRequest({ page: 2 });
		expect(req.page).toBe(2);
		expect(req.limit).toBe(10);
	});

	it('deve manter o valor padrão se apenas limit for passado', () => {
		const req = new PaginationRequest({ limit: 50 });
		expect(req.page).toBe(1);
		expect(req.limit).toBe(50);
	});
});
