import { NextFunction, Response, Request } from 'express';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token)
    throw new UnauthenticatedError('authentication error no token found');
  try {
    const { userId, role } = verifyJWT(token);

    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication error no token found');
  }
};
