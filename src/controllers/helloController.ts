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
export function postUser(req: Request, res: Response) {
  /*  #swagger.parameters['body'] = {
            in: 'body', 
            description: 'Add a test',
             schema: {
                $name: 'John Doe',
                $age: 29,
            }
    } */
  const { name, age } = req.body;

  // Validation: Ensure both name and age are provided
  if (!name || typeof name !== 'string' || !age || typeof age !== 'number') {
    return res
      .status(400)
      .json({ error: 'Invalid input. Please provide both name (string) and age (number).' });
  }

  // Respond with age categorization
  const ageCategory = age < 20 ? 'child' : 'older';
  res.json({ message: `Hi ${name}, you are considered an ${ageCategory}.` });
}
