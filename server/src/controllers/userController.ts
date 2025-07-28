import { StatusCodes } from 'http-status-codes';
import { User } from '../models/UserModel.js';
import { Job } from '../models/JobModel.js';
import { Request, Response, NextFunction } from 'express';
import { s3Client } from '../utils/s3.js';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.userId);
    const userWithoutPassword = user?.toJSON();
    res.status(StatusCodes.OK).json({
      message: 'You have succesfully get the current user information!',
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

export const uploadUserImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'No Image file provided',
      });
    }
    const user = await User.findById(req.user?.userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }
    // Delete existing image if present
    if (user.image) {
      try {
        // Extract the key from the existing imageUrl
        const urlParts = user.image.split('.amazonaws.com/');
        if (urlParts.length > 1) {
          const existingKey = urlParts[1];
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.BUCKET_NAME!,
            Key: existingKey,
          });
          await s3Client.send(deleteCommand);
        }
      } catch (err) {
        console.error('Error deleting previous image:', err);
        // Continue with upload even if deletion fails
      }
    }
    const file = req.file!;
    const fileName = `user-images/${req.user?.userId}-${Date.now()}-${
      file.originalname
    }`;
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(uploadCommand);

    const imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${fileName}`;

    res.status(StatusCodes.CREATED).json({
      message: 'Image Uploaded!',
      imageUrl,
    });
  } catch (error) {
    next(error);
  }
};
