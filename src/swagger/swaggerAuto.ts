import { SWAGGER_CONFIG } from './swagger.config';
import swaggerAutogen from 'swagger-autogen';
import { type JsonObject } from 'swagger-ui-express';
import { readSwaggerFile, SWAGGER_FILE_PATH, updateSwaggerFile } from './functions';
import path from 'path';
/**
 * Organizes Swagger document paths into tags based on first segment after /api/
 *
 * @param {JsonObject} swaggerDocument - Parsed swagger document object
 * @returns {JsonObject} Updated swagger document with tags
 */
// export function organizeSwaggerTags(swaggerDocument: JsonObject): JsonObject {
//   // Automatically add tags based on first path segment after /api/

//   swaggerDocument.tags = swaggerDocument.tags || [];
//   const existingTags = new Set(swaggerDocument.tags.map((tag: { name: string }) => tag.name));

//   for (const pathKey of Object.keys(swaggerDocument.paths)) {
//     // * Extract first segment after /api/

//     console.log('pathKey:', pathKey);
//     const match = pathKey.match(/^\/api\/([^\/]+)/);

//     if (match) {
//       const tagName = match[1];
//       console.log('tagName:', tagName);

//       // Add tag to tags array if not present
//       if (!existingTags.has(tagName)) {
//         swaggerDocument.tags.push({ name: tagName, description: `${tagName} endpoints` });
//         existingTags.add(tagName);
//       }
//       // Add tag to each method in path
//       const methods = swaggerDocument.paths[pathKey];
//       for (const methodKey of Object.keys(methods)) {
//         methods[methodKey].tags = methods[methodKey]?.tags || [];
//         if (methods[methodKey].tags.includes(tagName)) continue; // Avoid duplicates
//         methods[methodKey].tags.push(tagName);
//       }
//     }
//   }

//   return swaggerDocument;
// }

export function organizeSwaggerTags(swaggerDocument: JsonObject): JsonObject {
  // 1. נוודא שיש מערך tags (גם אם ריק)
  swaggerDocument.tags = swaggerDocument.tags ?? [];

  // מפה של שמות תגים שכבר קיימים (לפי name)
  const existingTagNames = new Set(swaggerDocument.tags.map((t: any) => t.name));

  // עוברים על כל ה‑paths
  for (const pathKey of Object.keys(swaggerDocument.paths)) {
    const match = pathKey.match(/^\/api\/([^\/]+)/);
    if (!match) continue;

    const tagName = match[1];

    // 2. מוסיפים את ה‑tag לרשימה הגלובלית רק אם הוא עדיין לא קיים
    if (!existingTagNames.has(tagName)) {
      swaggerDocument.tags.push({
        name: tagName,
        description: `${tagName.charAt(0).toUpperCase() + tagName.slice(1)} endpoints`,
      });
      existingTagNames.add(tagName);
    }

    // 3. לכל method ב‑path נוודא שה‑tag מופיע בדיוק פעם אחת
    const pathItem = swaggerDocument.paths[pathKey];
    for (const method of Object.keys(pathItem)) {
      const operation = pathItem[method];

      if (!Array.isArray(operation.tags)) {
        operation.tags = [];
      }

      // אם ה‑tag כבר קיים – לא מוסיפים שוב
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
    await swaggerAutogen()(fullPath, swaggerConfig.endpointsRoutes, swaggerConfig.document);

    const swaggerDocument = await readSwaggerFile(fullPath);

    const sw = organizeSwaggerTags(swaggerDocument);

    await updateSwaggerFile(sw, fullPath);

    console.info(`Swagger docs generated successfully.in path "${fullPath}"`);
    return sw;
  } catch (error) {
    console.error('Error generating Swagger docs:', error);
    throw error;
  }
}
