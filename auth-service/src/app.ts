import express from 'express';
import routes from './routes';
import { errorHandler } from './shared/middlewares/error-handler';
import { registerDependencies } from './shared/container';
import { httpLogger } from './shared/middlewares/http-logger';

const app = express();

registerDependencies();

app.use(express.json());
app.use(httpLogger);
app.use(routes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Service is running' });
});

app.use(errorHandler);

export default app;