import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { Result } from '../result-pattern';

export const validateRequest = (schema: ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			const errors = Object.entries(result.error.format())
				.filter(([key]) => key !== '_errors')
				.flatMap(([_, val]: [string, any]) => val._errors);

			res.status(400).json(Result.fail(errors));
			return;
		}

		req.body = result.data;
		next();
	};
};
