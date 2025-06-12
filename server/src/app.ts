import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import JobsRouter from './routes/jobsRoute.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Adding middlewares
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/jobs', JobsRouter);
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not Found :/',
  });
});
//handling error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    message: 'Something went wrong!',
  });
});

try {
  await mongoose.connect(process.env.MONGO_URL!);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
