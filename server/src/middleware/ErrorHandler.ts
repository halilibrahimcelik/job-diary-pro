import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

export const errorHandlerMiddleware = (
  err: NotFoundError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error handler triggered:', err);

  const errorStatus = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || 'Something went wrong!';

  res.status(errorStatus).json({
    message: errorMessage,
  });
};
