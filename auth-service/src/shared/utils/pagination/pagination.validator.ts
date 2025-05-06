import { z } from 'zod';

export const PaginationValidator = z.object({
	page: z
		.string()
		.optional()
		.transform((val) => parseInt(val || '1'))
		.refine((val) => !isNaN(val) && val > 0, {
			message: 'page deve ser um número maior que 0',
		}),

	limit: z
		.string()
		.optional()
		.transform((val) => parseInt(val || '10'))
		.refine((val) => !isNaN(val) && val > 0 && val <= 100, {
			message: 'limit deve ser um número entre 1 e 100',
		}),
});
