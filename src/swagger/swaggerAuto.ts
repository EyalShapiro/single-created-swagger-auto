import { SWAGGER_CONFIG } from './swagger.config';
import swaggerAutogen from 'swagger-autogen';
import { SWAGGER_FILE_PATH, updateSwaggerFile } from './utils/functions';
import { applyCustomRouteDescriptions, organizeSwaggerTags } from './utils/sortedData';

/**
 * Generates Swagger documentation by merging auto-generated and custom route data.
 * @returns The generated Swagger document object.
 */
export async function generateSwaggerDocs(swaggerConfig = SWAGGER_CONFIG) {
  try {
    console.info('Generating Swagger docs...');
    const fullPath = SWAGGER_FILE_PATH;

    // Generate the base swagger documentation file from API endpoints.
    await swaggerAutogen({ openapi: '3.0.3', autoHeaders: true, autoBody: true })(
      fullPath,
      swaggerConfig.endpointsRoutes,
      swaggerConfig.document,
    );

    const swaggerDocument = await applyCustomRouteDescriptions(fullPath);

    // 5. Organize tags for all paths.
    const organizedSwaggerDoc = organizeSwaggerTags(swaggerDocument);

    // 6. Write the final, updated swagger document once.
    await updateSwaggerFile(organizedSwaggerDoc, fullPath);

    console.info(
      `\x1b[1m[info]\x1b[0m: Swagger docs generated successfully at path "${fullPath}" `,
    );
    return organizedSwaggerDoc;
  } catch (error) {
    console.error('\n\x1b[31mError generating Swagger docs:\x1b[0m', error);
    throw error;
  }
}
