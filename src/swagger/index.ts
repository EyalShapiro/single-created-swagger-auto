import { generateSwaggerDocs } from './swaggerAuto';
import { readSwaggerFile } from './utils/functions';

export default async function getSwaggerDocument() {
  return (await readSwaggerFile().catch(() => null)) ?? (await generateSwaggerDocs());
}
