import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

import { SWAGGER_CONFIG } from '../swagger.config';
import { JsonObject } from 'swagger-ui-express';
import { parseJson } from '../../utils/safeParseJSON';

/**
 * Absolute path to the generated Swagger/OpenAPI JSON file.
 * Uses process.cwd() → always points to project root, works perfectly with:
 * - ts-node (dev)
 * - compiled JS in dist (production)
 * - Docker, PM2, Vercel, etc.
 */
export const SWAGGER_FILE_PATH =
  path.resolve(process.cwd(), SWAGGER_CONFIG.outputFile) || SWAGGER_CONFIG.outputFile;
/**
 * Checks whether the Swagger JSON file exists on disk
 *
 * @param filePath - Optional absolute or relative path (defaults to config)
 * @returns {boolean} true if file exists, false otherwise
 */
export const checkSwaggerFile = (filePath: string = SWAGGER_FILE_PATH): boolean =>
  fs.existsSync(filePath);
/**
 * Reads and safely parses the Swagger/OpenAPI JSON file from disk
 *
 * @param {string} filePath  - Optional custom path (defaults to config-defined file)
 * @returns {Promise<JsonObject>} Parsed Swagger document as JsonObject
 * @throws If file doesn't exist or JSON is invalid
 */
export async function readSwaggerFile(filePath: string = SWAGGER_FILE_PATH): Promise<JsonObject> {
  try {
    if (!checkSwaggerFile(filePath)) {
      throw new Error(`Swagger output file does not exist. "${filePath}"`);
    }
    const fileData = await fsPromises.readFile(filePath, { encoding: 'utf-8' });

    const jsonSD = parseJson(fileData); //the swagger document json data
    return jsonSD as JsonObject;
  } catch (error) {
    console.error('Error reading Swagger file:', error);
    throw error;
  }
}

/**
 * Updates (overwrites) the Swagger JSON file on disk
 * Synchronously writes – suitable for startup/build time
 *
 * @param {JsonObject} swaggerDocument - Complete OpenAPI object to save
 * @param {string} fullPath=SWAGGER_FILE_PATH - Optional custom path
 */
export async function updateSwaggerFile(
  swaggerDocument: JsonObject,
  filePath: string = SWAGGER_FILE_PATH,
) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      await fsPromises.mkdir(dir, { recursive: true });
    }

    await fsPromises.writeFile(filePath, JSON.stringify(swaggerDocument, null, 2), 'utf-8');
    console.info(`Swagger file updated: ${filePath}`);
  } catch (error) {
    console.error('Error updating Swagger file:', error);
    throw error;
  }
}
/**
 * Standardizes a path string to ensure it starts with a '/' and has no trailing '/'.
 * @param {string} path The path string to normalize.
 * @returns {string} The normalized path string.
 */
export function normalizePath(path: string): string {
  if (!path) return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (withLeading.length > 1 && withLeading.endsWith('/')) {
    return withLeading.slice(0, -1);
  }
  return withLeading;
}
