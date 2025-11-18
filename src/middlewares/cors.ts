import { CorsOptions } from 'cors';
import express from 'express';
import { ORIGINALS_OPTION } from '../config';
import { getUrlOrigins } from '../utils/getUrlOrigins';

/**
 * CORS configuration object
 * @typedef {Object} CorsOptions
 * @property {CustomOrigin} origin - Function to validate request origin
 * @property {number} optionsSuccessStatus - Status code to return for successful OPTIONS requests
 */

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (ORIGINALS_OPTION.includes(getUrlOrigins(origin))) {
      callback(null, true);
    } else {
      console.warn(`CORS policy does not allow access from origin: ${origin || ''}`);
      callback(new Error('Not allowed by CORS!'));
    }
  },
  optionsSuccessStatus: 200,
};

export const corsHeaders = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};
