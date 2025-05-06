import { Request, Response, NextFunction } from 'express';
import { logger } from '../Logger/logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
	const { method, originalUrl } = req;
	const start = Date.now();

	res.on('finish', () => {
		const duration = Date.now() - start;
		const { statusCode } = res;

		logger.info(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
	});

	next();
};
