import 'dotenv/config';

import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import router from './routes';
import { errorHandler, notFound404Handle } from './middlewares/errorHandler';
import { HOST, IS_PROD, PORT } from './config';
import { addTimeStamp } from './middlewares/timeStamp';
import { corsOptions } from './middlewares/cors';
import getSwaggerDocument from './swagger';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));

app.use(addTimeStamp);

app.get('/', (_req, res) => res.send('Hello World!'));
app.get('/ping', (_req, res) => {
  const style = `display: flex; width: 100%;  height: 100%;
    flex-wrap: nowrap; align-items: center; justify-content: center; color: blue;`;
  res.status(200).send(`<div style='${style}'><h1>pong</h1></div>`);
});
app.get('/status', (req, res) => {
  res.jsonp({
    status: 'Running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api', router);

app.use(notFound404Handle);
app.use(errorHandler);

(async function () {
  const swaggerDocument = await getSwaggerDocument();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  const server = http.createServer(app);
  server.listen(PORT, async () => {
    try {
      console.info(`\n\x1b[32mServer running on http://${HOST}\x1b[0m`);

      if (!IS_PROD) console.info(`\x1b[32mSwagger UI at http://${HOST}/api-docs\x1b[0m`);
    } catch (error) {
      console.error('\x1b[31mError initializing server:\x1b[0m', error);
      server.close();
      process.exit(1);
    }
  });
})();
