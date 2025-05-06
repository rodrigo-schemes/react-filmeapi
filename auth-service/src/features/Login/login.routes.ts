import { Router } from 'express';
import { validateRequest } from '../../shared/middlewares/Validation/validate-request';
import { LoginUserValidator } from './LoginUser/login-user.validator';
import { LoginUserController } from './LoginUser/login-user.controller';
import { authRateLimiter } from '../../shared/middlewares/RateLimit/rate-limit';

const router = Router();

router.post(
	'/login',
	authRateLimiter,
	validateRequest({ body: LoginUserValidator }),
	LoginUserController.login,
);

export default router;
