import express, { Request, Response } from 'express';
import cors from 'cors';

import morgan from 'morgan';
import * as dotenv from 'dotenv';
import JobsRouter from './routes/jobsRoute.js';
import AuthRouter from './routes/authRoute.js';
import UserRouter from './routes/userRouter.js';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { errorHandlerMiddleware } from './middleware/ErrorHandler.js';
import { validateTest } from './middleware/validationMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Adding middlewares
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000'; // Default to localhost for development

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post('/api/v1/test', validateTest, (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({
    message: `Hello ${name}`,
  });
});

app.use('/api/v1/jobs', authenticateUser, JobsRouter);

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', authenticateUser, UserRouter);
app.use('*', (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: 'Not Found :/',
  });
});
//handling error middleware
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URL!);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
