import { SWAGGER_CONFIG } from './swagger.config';
import swaggerAutogen from 'swagger-autogen';
import { type JsonObject } from 'swagger-ui-express';
import { readSwaggerFile, SWAGGER_FILE_PATH, updateSwaggerFile } from './functions';
import { createSwaggerRouteData } from './createSwaggerRouteData';

/**
 * Organizes Swagger document paths into tags based on first segment after /api/
 *
 * @param {JsonObject} swaggerDocument - Parsed swagger document object
 * @returns {JsonObject} Updated swagger document with tags
 */

export function organizeSwaggerTags(swaggerDocument: JsonObject): JsonObject {
  swaggerDocument.tags = swaggerDocument?.tags ?? [];

  const existingTagNames = new Set(swaggerDocument.tags.map((t: any) => t.name));

  for (const pathKey of Object.keys(swaggerDocument.paths)) {
    const match = pathKey.match(/^\/api\/([^\/]+)/);
    if (!match) continue;

    const tagName = match[1];

    if (!existingTagNames.has(tagName)) {
      swaggerDocument.tags.push({
        name: tagName,
        description: `${tagName.charAt(0).toUpperCase() + tagName.slice(1)} endpoints`,
      });
      existingTagNames.add(tagName);
    }

    const pathItem = swaggerDocument.paths[pathKey];
    for (const method of Object.keys(pathItem)) {
      const operation = pathItem[method];

      if (!Array.isArray(operation.tags)) {
        operation.tags = [];
      }

      if (!operation.tags.includes(tagName)) {
        operation.tags.push(tagName);
      }
    }
  }

  return swaggerDocument;
}
/**
 * Generates Swagger documentation
 *
 * @returns {JsonObject} Swagger document object
 */
export async function generateSwaggerDocs(swaggerConfig = SWAGGER_CONFIG) {
  try {
    // const swaggerAutogen = (await import('swagger-autogen')).default;
    console.info('Generating Swagger docs...');

    // Generate swagger documentation file
    const fullPath = SWAGGER_FILE_PATH;
    await swaggerAutogen({ openapi: '3.0.3', autoHeaders: true, autoBody: true })(
      fullPath,
      swaggerConfig.endpointsRoutes,
      swaggerConfig.document,
    );
    console.log('get', createSwaggerRouteData.getData());

    const swaggerDocument = await readSwaggerFile(fullPath);
    const sw = organizeSwaggerTags(swaggerDocument);
    await updateSwaggerFile(sw, fullPath);

    await createSwaggerRouteData.updateSwagger();
    console.info(`Swagger docs generated successfully.in path "${fullPath}"`);
    return sw;
  } catch (error) {
    console.error('Error generating Swagger docs:', error);
    throw error;
  }
}
