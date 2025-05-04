import { Router } from 'express';
import userRoutes from './features/User/user.routes';
import loginRoutes from './features/Login/login.routes';

const router = Router();

router.use(userRoutes);
router.use(loginRoutes);

if (process.env.NODE_ENV === 'test') {
    router.get('/error-test', (_req, _res) => {
        throw new Error('Erro simulado');
    });
}

export default router;