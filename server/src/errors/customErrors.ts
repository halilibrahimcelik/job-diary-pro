import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'UnautherizedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class ForbiddenError extends Error {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.name = 'ForbidenError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
