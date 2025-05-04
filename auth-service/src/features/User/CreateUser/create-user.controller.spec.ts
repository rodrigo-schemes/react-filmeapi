import request  from 'supertest';
import app from '../../../app';
import { UserSeed } from '../../../../tests/seeds/user.seed';
import { CreateUserBuilder } from '../../../../tests/builders/create-user.builder';
import { UserModel } from '../../../infra/db/mongoose/repository/user.repository.mongo';

describe('CreateUserController', () => {

    beforeEach(async () => {
        await UserSeed.clear();
    });

    it('deve retornar 400 se os dados de entrada estiverem incorretos', async () => {
        const user = await UserSeed.createUser();

        const res = await request(app).post('/users').send({
            name: '',
            email: '',
            password: '',
        });

        expect(res.status).toBe(400);
        expect(res.body.isSuccess).toBe(false);
        expect(res.body.errors).toEqual([
            'Nome é obrigatório',
            'E-mail inválido',
            'Senha deve ter no mínimo 6 caracteres',
        ]);
    });

    it('deve retornar 400 se o email já estiver cadastrado', async () => {
        const user = await UserSeed.createUser();

        const res = await request(app).post('/users').send({
            name: user.name,
            email: user.email,
            password: user.rawPassword,
        });

        expect(res.status).toBe(400);
        expect(res.body.isSuccess).toBe(false);
        expect(res.body.errors).toContain('E-mail já cadastrado');
    });

    it('deve criar usuário e retornar 201 com id', async () => {
        var command = new CreateUserBuilder().build();
        
        const res = await request(app).post('/users').send({
            name: command.name,
            email: command.email,
            password: command.password
        });

        const user = await UserModel.findOne({ email: command.email });

        expect(user).not.toBeNull();
        expect(res.status).toBe(201);
        expect(res.body.isSuccess).toBe(true);
        expect(res.body.data.id).toBe(user!.id.toString());
    });
});