import 'dotenv/config';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import router from './routes';
import { errorHandler, notFound404Handle } from './middlewares/errorHandler';
import { HOST, PORT } from './config';
import { generateSwaggerDocs } from './swaggerAuto';
import { addTimeStamp } from './middlewares/timeStamp';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(addTimeStamp);

app.get('/', (_req, res) => res.send('Hello World!'));
app.use('/api', router);

app.use(notFound404Handle);
app.use(errorHandler);
async function setupSwagger() {
  const swaggerDocument = await generateSwaggerDocs();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

http.createServer(app).listen(PORT, async () => {
  try {
    console.info(`Server running on http://${HOST}`);
    await setupSwagger();
    console.info(`Swagger UI at http://${HOST}/api-docs`);
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1);
  }
});
