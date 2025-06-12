import { Request, Response, NextFunction } from 'express';
import { IJob, Job } from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await Job.find();
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

    if (!company || !position) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Data is missing',
      });
      return;
    }

    const newJob = new Job({
      company,
      position,
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
    if (!selectedJob) {
      throw new NotFoundError(`No job found with ID ${jobId}`);
    }
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
    // const { company, location, position, salary } = req.body as IJob;

    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!job) {
      throw new NotFoundError(`No job found with ID ${jobId}`);
    }

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

    const jobIndex = await Job.findById(jobId);
    if (!jobIndex) {
      throw new NotFoundError(`No job found with ID ${jobId}`);
    }

    await Job.deleteOne({ _id: jobId });

    res.status(StatusCodes.CREATED).json({
      message: 'Job has been removed from the list',
    });
  } catch (error) {
    next(error);
  }
};
