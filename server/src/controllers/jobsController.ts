import { Request, Response, NextFunction } from 'express';
import { IJob, Job } from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const jobs = await Job.find({ createdBy: user?.userId });
    res.status(StatusCodes.OK).json({
      message: 'Data send successfully!!',
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { company, location, position, salary, jobLocation } =
      req.body as IJob;

    const newJob = new Job({
      company,
      position,
      location,
      salary,
      jobLocation,
      createdBy: req.user?.userId,
    });

    await newJob.save();
    res.status(StatusCodes.CREATED).json({
      message: 'Job has been created!',
      data: newJob,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getSingleJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobId = req.params.jobId;

    const selectedJob = await Job.findById(jobId).exec();

    res.status(StatusCodes.OK).json({
      message: 'Data fetched succesfully',
      data: selectedJob,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const editSingleJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

    res.status(StatusCodes.CREATED).json({
      message: 'Your job with ID  ' + jobId + ' successfully edited',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deletesingleJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;

    await Job.deleteOne({ _id: jobId });

    res.status(StatusCodes.CREATED).json({
      message: 'Job has been removed from the list',
    });
  } catch (error) {
    next(error);
  }
};
