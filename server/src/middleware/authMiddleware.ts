import { NextFunction, Response, Request } from 'express';
import {
  ForbiddenError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
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

export const checkTesterRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
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
    console.log(roles);
    if (!roles.includes(req.user?.role)) {
      throw new ForbiddenError('Unauthorized to access this feature');
    }
    next();
  };
};
