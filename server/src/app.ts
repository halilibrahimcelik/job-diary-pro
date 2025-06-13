import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import JobsRouter from './routes/jobsRoute.js';
import UserRouter from './routes/userRoute.js';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { errorHandlerMiddleware } from './middleware/ErrorHandler.js';
import { validateTest } from './middleware/validationMiddleware.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Adding middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.post('/api/v1/test', validateTest, (req: Request, res: Response) => {
  const { name } = req.body;
  res.json({
    message: `Hello ${name}`,
  });
});

app.use('/api/v1/jobs', JobsRouter);
app.use('/api/v1/user', UserRouter);
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
