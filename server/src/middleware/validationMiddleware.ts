import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { NextFunction, Request, Response } from 'express';

const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;
        throw new BadRequestError(message);
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
