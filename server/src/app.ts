import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import JobsRouter from './routes/jobsRoute.js';
export const jobs = [
  {
    id: nanoid(),
    position: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New York',
    salary: 120000,
  },
  {
    id: nanoid(),
    position: 'Data Scientist',
    company: 'Data Inc',
    location: 'San Francisco',
    salary: 130000,
  },
  {
    id: '122',
    position: 'UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles',
    salary: 110000,
  },
  {
    id: nanoid(),
    position: 'Product Manager',
    company: 'Innovate Ltd',
    location: 'Austin',
    salary: 140000,
  },
];
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
  res.status(500).json({
    message: 'Something went wrong!',
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
