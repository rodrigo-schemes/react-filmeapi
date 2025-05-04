import request from 'supertest';
import app from '../../../app';
import { UserSeed } from '../../../../tests/seeds/user.seed';

describe('LoginUserController', () => {
	let seededUser: { email: string; rawPassword: string };

	beforeEach(async () => {
		await UserSeed.clear();
		const user = await UserSeed.createUser();
		seededUser = user;
	});

	it('retorna 200 e token ao logar com sucesso', async () => {
		const res = await request(app)
			.post('/login')
			.send({ email: seededUser.email, password: seededUser.rawPassword });

		expect(res.status).toBe(200);
		expect(res.body.data.token).toBeDefined();
	});

	it('retorna 400 se dados de entrada forem inválidos', async () => {
		const res = await request(app).post('/login').send({ email: '', password: '' });

		expect(res.status).toBe(400);
		expect(res.body.isSuccess).toBe(false);
		expect(res.body.errors).toEqual(['E-mail inválido', 'Senha é obrigatória']);
	});

	it('retorna 400 se credenciais forem inválidas', async () => {
		const res = await request(app)
			.post('/login')
			.send({ email: seededUser.email, password: 'errado' });

		expect(res.status).toBe(400);
		expect(res.body.errors).toContain('Credenciais inválidas');
	});
});
