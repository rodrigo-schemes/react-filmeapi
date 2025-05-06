import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import app from './app';
import connectToDatabase from './infra/db/mongoose/mongoose.connect';
import { logger } from './shared/middlewares/Logger/logger';

const port = process.env.PORT || 3000;

(async () => {
	try {
		await connectToDatabase();
		app.listen(port, () => {
			logger.info(`✅ Servidor rodando em http://localhost:${port}`);
		});
	} catch (err) {
		logger.error('❌ Erro ao conectar ao banco de dados:', err);
	}
})();
