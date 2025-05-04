import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Auth Service API',
			version: '1.0.0',
			description: 'Documentação da API de autenticação',
		},
	},
	apis: ['src/features/**/*.doc.ts'],
};
