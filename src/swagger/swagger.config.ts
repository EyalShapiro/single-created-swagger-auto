import { SwaggerOptions } from 'swagger-ui-express';
import { HOST } from '../config';
import packageJson from '../../package.json';

/**
 * Main Swagger/OpenAPI document configuration
 * This object defines the metadata and global settings for the auto-generated API documentation
 */
const SWAGGER_DOCUMENT: SwaggerOptions = {
  openapi: '3.0.3',

  // General API information - pulled from package.json when available
  info: {
    title: 'API Example auto-generated Swagger',
    author: packageJson?.author || 'Eyal Shapiro',
    description:
      packageJson?.description || 'Auto-generated Swagger documentation using swagger-autogen',
    version: packageJson?.version || '1.1.2',

    /* Contact information for API consumers */
    contact: {
      name: 'my-github(EyalShapiro)',
      url: 'https://github.com/EyalShapiro',
    },

    /* License information (customized for your project) */
    license: {
      name: 'this project in my github',
      url: 'https://github.com/EyalShapiro/single-created-swagger-auto',
    },
  },

  // Available server environments
  servers: [
    {
      description: 'localhost server',
      url: `http://${HOST}`,
    } /* Local development server (e.g., http://localhost:3000) */,
    {
      description: 'Production server',
      url: 'https://api.myapp.com',
    } /*  Replace with your real production URL */,
  ],

  /* Global security definitions - enables Bearer JWT authentication across the API*/
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token: Bearer <your-token-here>',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  // Legacy Swagger 2.0 fields (still supported by swagger-autogen for compatibility)
  schemes: ['http', 'https'] /* Supported protocols*/,
  host: HOST /* Base host (e.g., localhost:3000) - used in Swagger 2.0 mode*/,
  basePath: '/' /* Base path for all routes*/,
};

/**
 * Configuration object for swagger-autogen
 * Tells the library where to generate the file and which files to scan for routes/endpoints
 */
export const SWAGGER_CONFIG = {
  outputFile: 'tools/swagger-output.json' /* Generated OpenAPI JSON file */,
  endpointsRoutes: [
    './src/app.ts' /* Main app entry (for app.use() routes) */,
    './src/routes/*.ts' /* All route files (supports glob pattern) */,
    // Add more paths if needed, e.g.:
    // './src/controllers/*.ts',
    // './src/api.ts',
    // './src/modules/**/routes/*.ts',
  ],
  document: SWAGGER_DOCUMENT /*  Base document to merge with auto-generated paths */,
};
