import { PaginationValidator } from './pagination.validator';

describe('PaginationValidator', () => {
	it('deve aceitar valores válidos de page e limit como strings numéricas', () => {
		const result = PaginationValidator.safeParse({ page: '2', limit: '20' });

		expect(result.success).toBe(true);
		expect(result.data).toEqual({ page: 2, limit: 20 });
	});

	it('deve assumir valores padrão se não forem fornecidos', () => {
		const result = PaginationValidator.safeParse({});

		expect(result.success).toBe(true);
		expect(result.data).toEqual({ page: 1, limit: 10 });
	});

	it('deve falhar se page for menor ou igual a 0', () => {
		const result = PaginationValidator.safeParse({ page: '0', limit: '10' });

		expect(result.success).toBe(false);
		expect(result.error!.flatten().fieldErrors.page).toContain(
			'page deve ser um número maior que 0',
		);
	});

	it('deve falhar se limit for maior que 100', () => {
		const result = PaginationValidator.safeParse({ page: '1', limit: '200' });

		expect(result.success).toBe(false);
		expect(result.error!.flatten().fieldErrors.limit).toContain(
			'limit deve ser um número entre 1 e 100',
		);
	});

	it('deve falhar se limit for um valor inválido', () => {
		const result = PaginationValidator.safeParse({ limit: 'abc' });

		expect(result.success).toBe(false);
		expect(result.error!.flatten().fieldErrors.limit).toContain(
			'limit deve ser um número entre 1 e 100',
		);
	});
});
