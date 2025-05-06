import { z } from 'zod';
import { validateRequest } from './validate-request';
import { Request, Response, NextFunction } from 'express';
import { Result } from '../../utils/result/result-pattern';

const createMockRes = () => {
	const res: Partial<Response> = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res as Response;
};

describe('validateRequest middleware', () => {
	let next: NextFunction;

	beforeEach(() => {
		jest.clearAllMocks();
		next = jest.fn();
	});

	it('valida o corpo com sucesso', () => {
		const schema = z.object({ name: z.string() });
		const req = { body: { name: 'John' } } as Request;
		const res = createMockRes();

		const middleware = validateRequest({ body: schema });
		middleware(req, res, next);

		expect(next).toHaveBeenCalled();
		expect(res.status).not.toHaveBeenCalled();
	});

	it('retorna erro ao validar o corpo', () => {
		const schema = z.object({ name: z.string() });
		const req = { body: { name: 123 } } as Request;
		const res = createMockRes();

		const middleware = validateRequest({ body: schema });
		middleware(req, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith(Result.fail(['Expected string, received number']));
		expect(next).not.toHaveBeenCalled();
	});

	it('valida query com sucesso', () => {
		const schema = z.object({ page: z.string() });
		const req = { query: { page: '1' } } as unknown as Request;
		const res = createMockRes();

		const middleware = validateRequest({ query: schema });
		middleware(req, res, next);

		expect(next).toHaveBeenCalled();
	});

	it('valida params com sucesso', () => {
		const schema = z.object({ id: z.string().uuid() });
		const req = { params: { id: '550e8400-e29b-41d4-a716-446655440000' } } as unknown as Request;
		const res = createMockRes();

		const middleware = validateRequest({ params: schema });
		middleware(req, res, next);

		expect(next).toHaveBeenCalled();
	});

	it('retorna erro se nenhum schema for fornecido', () => {
		const req = {} as Request;
		const res = createMockRes();

		const middleware = validateRequest({});
		middleware(req, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith(Result.fail(['Nenhum schema fornecido']));
		expect(next).not.toHaveBeenCalled();
	});
});
