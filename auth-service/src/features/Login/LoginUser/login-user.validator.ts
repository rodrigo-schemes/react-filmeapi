import { z } from 'zod';

export const LoginUserValidator = z.object({
	email: z.string().email('E-mail inválido'),
	password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginUserRequest = z.infer<typeof LoginUserValidator>;
