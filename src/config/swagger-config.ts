import { HOST } from './server';

const SWAGGER_DOCUMENT = {
  info: {
    title: 'API Example auto-generated Swagger',
    description: 'Auto-generated Swagger documentation using swagger-autogen',
    version: '1.1.2',
    contact: { name: 'my-github', url: 'https://github.com/EyalShapiro' },
    license: {
      name: 'this project in my github',
      url: 'https://github.com/EyalShapiro/single-created-swagger-auto',
    },
  },
  host: HOST,
  schemes: ['http'],
};
export const SWAGGER_CONFIG = {
  outputFile: './swagger-output.json',
  endpointsRoutes: ['./src/app.ts', './src/routes/*.ts'],
  document: SWAGGER_DOCUMENT,
};
