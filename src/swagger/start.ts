import 'dotenv/config';

import { generateSwaggerDocs } from './swaggerAuto';
export const SWAGGER_WORK = (process.env?.SWAGGER || 'false') === 'true';
console.log('SWAGGER_WORK:', SWAGGER_WORK);

(async () => {
  try {
    await generateSwaggerDocs();
  } catch (error) {
    console.error();
  } finally {
    console.log('finally block executed generateSwaggerDocs');
    if (SWAGGER_WORK) process.exit('finished');
  }
})();
