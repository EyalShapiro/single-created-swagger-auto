import fs from 'fs';
import path from 'path';

import { SWAGGER_CONFIG } from './config';

/**
 * Organizes Swagger document paths into tags based on first segment after /api/
 *
 * @param {Record<string, any>} swaggerDocument - Parsed swagger document object
 * @returns {Record<string, any>} Updated swagger document with tags
 */
export function organizeSwaggerTags(swaggerDocument: Record<string, any>) {
  // Automatically add tags based on first path segment after /api/

  swaggerDocument.tags = swaggerDocument.tags || [];
  const existingTags = new Set(swaggerDocument.tags.map((tag: { name: string }) => tag.name));

  for (const pathKey of Object.keys(swaggerDocument.paths)) {
    // * Extract first segment after /api/

    const match = pathKey.match(/^\/api\/([^\/]+)/);
    if (match) {
      const tagName = match[1];
      // Add tag to tags array if not present
      if (!existingTags.has(tagName)) {
        swaggerDocument.tags.push({ name: tagName, description: `${tagName} endpoints` });
        existingTags.add(tagName);
      }
      // Add tag to each method in path
      const methods = swaggerDocument.paths[pathKey];
      for (const methodKey of Object.keys(methods)) {
        methods[methodKey].tags = methods[methodKey].tags || [];
        if (!methods[methodKey].tags.includes(tagName)) methods[methodKey].tags.push(tagName);
      }
    }
  }

  return swaggerDocument;
}

/**
 * Generates Swagger documentation
 *
 * @returns {Promise< Record<string, any>>} Swagger document object
 */
export async function generateSwaggerDocs() {
  try {
    const swaggerAutogen = (await import('swagger-autogen')).default;
    console.log('Generating Swagger docs...');

    // Generate swagger documentation file
    await swaggerAutogen()(
      SWAGGER_CONFIG.outputFile,
      SWAGGER_CONFIG.endpointsRoutes,
      SWAGGER_CONFIG.document,
    );
    // Read the generated file
    const fullPath = path.join(__dirname, SWAGGER_CONFIG.outputFile);
    if (!fs.existsSync(fullPath)) throw new Error('Swagger output file does not exist.');

    const swaggerDocument = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

    return organizeSwaggerTags(swaggerDocument);
  } catch (error) {
    console.error('Error generating Swagger docs:', error);
    throw error;
  }
}
