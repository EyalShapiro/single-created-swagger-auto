import 'dotenv/config';

import express from 'express';
import http from 'http';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import router from './routes';
import { errorHandler, notFound404Handle } from './middlewares/errorHandler';
import { HOST, IS_PROD, PORT } from './config';
import { generateSwaggerDocs } from './swagger/swaggerAuto';
import { addTimeStamp } from './middlewares/timeStamp';
import { corsHeaders, corsOptions } from './middlewares/cors';
import { readSwaggerFile } from './swagger/functions';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(corsHeaders);
app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));

app.use(addTimeStamp);

app.get('/', (_req, res) => res.send('Hello World!'));
app.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/api', router);

app.use(notFound404Handle);
app.use(errorHandler);
async function setupSwagger() {
  const swaggerDocument = (await readSwaggerFile()) ?? (await generateSwaggerDocs());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
http.createServer(app).listen(PORT, async () => {
  try {
    console.info(`Server running on http://${HOST}`);
    if (!IS_PROD) await setupSwagger();
    console.info(`Swagger UI at http://${HOST}/api-docs`);
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1);
  }
});
