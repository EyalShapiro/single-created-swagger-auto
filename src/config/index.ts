export * from './origins';

export * from './server.config';
/**
 * Secret key token used for signing/verifying tokens
 */
export const SECRET_TOKEN = process.env?.SECRET_TOKEN || 'test';
