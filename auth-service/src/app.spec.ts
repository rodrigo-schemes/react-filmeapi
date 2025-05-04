import request from 'supertest';
import app from './app';

describe('Health Check', () => {
	it('deve retornar 200 e mensagem de status', async () => {
		const res = await request(app).get('/health');

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			status: 'OK',
			message: 'Service is running',
		});
	});
});
