import { Router } from 'express';
import { CreateUserController } from './CreateUser/create-user.controller';
import { validateRequest } from '../../shared/middlewares/validate-request';
import { CreateUserValidator } from './CreateUser/create-user.validator';
import { authRateLimiter } from '../../shared/middlewares/rate-limit';

const router = Router();

router.post('/users', authRateLimiter, validateRequest(CreateUserValidator), CreateUserController.create);

export default router;