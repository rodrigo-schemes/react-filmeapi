import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 10, // Limite de 10 requisições por IP
	message: {
		isSuccess: false,
		errors: ['Muitas tentativas. Tente novamente mais tarde.'],
	},
	standardHeaders: true, // Inclui rate limit info nos headers padrão
	legacyHeaders: false, // Remove headers antigos (X-RateLimit-*)
});
