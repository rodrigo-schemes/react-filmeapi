import express from 'express';
import routes from './routes';
import { errorHandler } from './shared/middlewares/ErrorHandler/error-handler';
import { registerDependencies } from './shared/config/dependency-injection.container';
import { httpLogger } from './shared/middlewares/Logger/http-logger';
import { swaggerOptions } from './shared/docs/swagger.config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const specs = swaggerJsdoc(swaggerOptions);

registerDependencies();

app.use(express.json());
app.use(httpLogger);
app.use(routes);

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'OK', message: 'Service is running' });
});

app.use(errorHandler);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

export default app;
