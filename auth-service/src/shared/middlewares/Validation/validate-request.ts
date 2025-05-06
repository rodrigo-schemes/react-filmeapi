import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { Result } from '../../utils/result/result-pattern';

type ValidateRequestOptions = {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
};

export const validateRequest = (options: ValidateRequestOptions) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		let result;

		if (options.body) {
			result = options.body.safeParse(req.body);
		} else if (options.query) {
			result = options.query.safeParse(req.query);
		} else if (options.params) {
			result = options.params.safeParse(req.params);
		} else {
			res.status(400).json(Result.fail(['Nenhum schema fornecido']));
			return;
		}

		if (result && !result.success) {
			const errors = Object.entries(result.error.format())
				.filter(([key]) => key !== '_errors')
				.flatMap(([_, val]: [string, any]) => val._errors);

			res.status(400).json(Result.fail(errors));
			return;
		}

		if (options.body) req.body = result!.data;
		if (options.query) Object.assign(req.query, result!.data);
		if (options.params) Object.assign(req.params, result!.data);

		next();
	};
};
