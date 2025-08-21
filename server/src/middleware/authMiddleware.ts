import { NextFunction, Response, Request } from 'express';
import {
  ForbiddenError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let { token } = req.cookies;

  // If no token in cookies, check authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }
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

export const checkTesterRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { token } = req.cookies;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }
  const { role } = verifyJWT(token);
  if (role === 'tester') {
    throw new ForbiddenError(
      'This action is not available for Demo accounts. Please register to access this feature.'
    );
  }
  next();
};

export const authorizedPermissions = (...roles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      throw new ForbiddenError('Unauthorized to access this feature');
    }
    next();
  };
};
