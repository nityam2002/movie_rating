
import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/customError';

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);

  if (err.logging) {
   //TASK: Implement the Error logging service
  }
  return res.status(err.code || 500).json({ error: err.message });
};

export default errorMiddleware;
