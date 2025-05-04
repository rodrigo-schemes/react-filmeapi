import request from 'supertest';
import app from '../../app';

describe('Middleware - Error Handler', () => {
	it('deve retornar 500 quando uma exceção for lançada', async () => {
		const response = await request(app).get('/error-test');

		expect(response.status).toBe(500);
		expect(response.body).toEqual({
			isSuccess: false,
			errors: ['Erro interno do servidor.'],
		});
	});
});
