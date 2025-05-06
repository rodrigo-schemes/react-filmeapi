import { Router } from 'express';
import { CreateUserController } from './CreateUser/create-user.controller';
import { validateRequest } from '../../shared/middlewares/Validation/validate-request';
import { CreateUserValidator } from './CreateUser/create-user.validator';
import { authRateLimiter } from '../../shared/middlewares/RateLimit/rate-limit';
import { ListUsersValidator } from './ListUsers/list-users.validator';
import { ListUsersController } from './ListUsers/list-users.controller';

const router = Router();

router.post(
	'/users',
	authRateLimiter,
	validateRequest({ body: CreateUserValidator }),
	CreateUserController.create,
);

router.get('/users', validateRequest({ query: ListUsersValidator }), ListUsersController.list);

export default router;
