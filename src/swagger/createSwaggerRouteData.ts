import fs from 'fs';

import { JsonObject } from 'swagger-ui-express';
import { parseJson } from '../utils/safeParseJSON';
import { checkSwaggerFile, SWAGGER_FILE_PATH, updateSwaggerFile } from './functions';

export type SwaggerItem = {
  method: string;
  path: string;
  description?: { text: string };
  body?: { default: Record<string, any> };
};

export const createSwaggerRouteData = (() => {
  const data: SwaggerItem[] = [];
  const fun = async ({ method, path, body, description }: SwaggerItem) => {
    try {
      const route = {
        method,
        path,
        explain: description?.text || 'No explanation provided',
        body: body?.default || {},
      };

      const swaggerDocument: JsonObject = checkSwaggerFile()
        ? parseJson(fs.readFileSync(SWAGGER_FILE_PATH, 'utf-8'))
        : { paths: {} };

      if (!swaggerDocument.paths) swaggerDocument.paths = {};

      if (!swaggerDocument.paths[path]) swaggerDocument.paths[path] = {};
      const requestBody = route.body
        ? { content: { 'application/json': { example: route.body } } }
        : undefined;

      swaggerDocument.paths[path][method] = { description: route.explain, requestBody };

      await updateSwaggerFile(swaggerDocument);

      console.log('Swagger route added to document:', route);
      return route;
    } catch (error) {
      console.error('Error creating Swagger route:', error);
      throw error;
    }
  };
  return {
    addData: (item: SwaggerItem) => {
      data.push(item);
    },
    getData: () => data,
    updateSwagger: async () => {
      for (const item of data) {
        await fun(item);
      }
    },
  };
})();
export const createSwaggerRoute = createSwaggerRouteData.addData;
