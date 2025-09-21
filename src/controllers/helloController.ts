import { Request, Response } from 'express';
import ERROR_MSG from '../constant/error_msg';

export const getHello = (req: Request, res: Response) => {
  try {
    const statusCode = 200;
    const timeStamp = res.locals?.timeStamp || new Date().toUTCString();

    res.status(statusCode).json({ message: 'Hello World!', statusCode, timeStamp });
  } catch (error) {
    console.error(error);
    const statusCode = 500;
    res.status(statusCode).json({ message: ERROR_MSG.internal, statusCode, error });
  }
};
export function postHello(req: Request, res: Response) {
  try {
    const body = req.body;
    const statusCode = 200;
    const timeStamp = res.locals?.timeStamp || new Date().toUTCString();

    res.status(statusCode).json({ message: 'get back Hello World!', statusCode, timeStamp, body });
  } catch (error) {
    console.error(error);
    const statusCode = 500;
    res.status(statusCode).json({ message: ERROR_MSG.internal, statusCode, error });
  }
}
