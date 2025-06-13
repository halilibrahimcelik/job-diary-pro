import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { NextFunction, Request, Response } from 'express';
import { JobStatus, JobType } from '../types/index.js';
import { isValidObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { Job } from '../models/JobModel.js';
const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors.array()[0].msg as string;
        if (message.startsWith('No job')) {
          throw new NotFoundError(message);
        } else {
          throw new BadRequestError(message);
        }
      } else {
        next();
      }
    },
  ];
};

export const validateTest = withValidationErrors([
  body('name')
    .notEmpty()
    .trim()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 char'),
]);

export const validateCreateJob = withValidationErrors([
  body('company')
    .notEmpty()
    .trim()
    .withMessage('Company Name is required')
    .isLength({ min: 3 })
    .withMessage('Company Name must be at least 3 char'),
  body('position')
    .notEmpty()
    .trim()
    .withMessage('Position Name is required')
    .isLength({ min: 3 })
    .withMessage('Position Name must be at least 3 char'),
  body('jobLocation')
    .notEmpty()
    .trim()
    .withMessage('Location is required')
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 char'),
  body('jobStatus')
    .isIn([JobStatus.INTERVİEW, JobStatus.DECLINED, JobStatus.PENDING])
    .withMessage('invalid status value'),
  body('jobType')
    .isIn([JobType.FULL_TIME, JobType.PART_TIME, JobType.INTERSHIP])
    .withMessage('invalid Type value'),
]);
export const validateEditJob = withValidationErrors([
  body('company')
    .notEmpty()
    .trim()
    .withMessage('Company Name is required')
    .isLength({ min: 3 })
    .withMessage('Company Name must be at least 3 char'),
  body('position')
    .notEmpty()
    .trim()
    .withMessage('Position Name is required')
    .isLength({ min: 3 })
    .withMessage('Position Name must be at least 3 char'),
]);

export const validateIdParam = withValidationErrors([
  param('jobId').custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError('Invalid MongoDB ID');
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job found with ID ${value}`);
    }
  }),
]);

export const validateUserRegistration = withValidationErrors([
  body('name').trim().notEmpty().withMessage('Name is Required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is Required')
    .isEmail()
    .withMessage('Please write a valid email address'),
  body('lastName').trim().notEmpty().withMessage('Last Name is Required'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is Required')
    .isLength({ min: 4 })
    .withMessage('You Password should be at least 4 char'),
]);
