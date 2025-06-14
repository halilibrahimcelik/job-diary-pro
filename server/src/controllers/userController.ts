import { StatusCodes } from 'http-status-codes';
import { User } from '../models/UserModel.js';
import { Job } from '../models/JobModel.js';
import { Request, Response, NextFunction } from 'express';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.userId);
    const userWithoutPassword = user?.toJSON();
    res.status(StatusCodes.OK).json({
      message: 'get current user',
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
export const getApplicationStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({
    message: 'application stats',
    users,
    jobs,
  });
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let obj = { ...req.body };
  delete obj.password;
  await User.findByIdAndUpdate(req.user?.userId, obj);
  res.status(StatusCodes.OK).json({
    message: 'update User',
  });
};
