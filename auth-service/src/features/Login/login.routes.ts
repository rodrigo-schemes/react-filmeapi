import { Router } from 'express';
import { validateRequest } from '../../shared/middlewares/validate-request';
import { LoginUserValidator } from './LoginUser/login-user.validator';
import { LoginUserController } from './LoginUser/login-user.controller';
import { authRateLimiter } from '../../shared/middlewares/rate-limit';

const router = Router();

router.post(
	'/login',
	authRateLimiter,
	validateRequest(LoginUserValidator),
	LoginUserController.login,
);

export default router;
