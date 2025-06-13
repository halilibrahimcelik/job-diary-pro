import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { BadRequestError } from '../errors/customErrors.js';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email, lastName, location, name, role } = req.body as IUser;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new BadRequestError('Email is already taken!');
    }
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {
      password: hashedPassword,
      email,
      lastName,
      location,
      name,
      role,
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
