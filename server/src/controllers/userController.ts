import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email, lastName, location, name, role } = req.body as IUser;
  try {
    const isFirstAccount = (await User.count()) === 0;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new BadRequestError('Email is already taken!');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      password: hashedPassword,
      email,
      lastName,
      location,
      name,
      role: isFirstAccount ? 'admin' : 'user',
    };
    const newUser = new User(user);
    await newUser.save();
    res.status(StatusCodes.CREATED).json({
      message: 'User has been created succesfully!',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body as IUser;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      throw new UnauthenticatedError('There is no user found with that  email');
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (isPasswordMatched) {
      res.status(StatusCodes.OK).json({
        message: 'You successfully logged In',
      });
    } else {
      throw new UnauthenticatedError(
        'Your credentials are not correct please try again.'
      );
    }
  } catch (error) {
    next(error);
  }
};
