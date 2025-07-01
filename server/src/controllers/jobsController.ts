import { Request, Response, NextFunction } from 'express';
import { IJob, Job } from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { FilterQuery, SortOrder } from 'mongoose';
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const queryParams = req.query;
    const filter: FilterQuery<IJob> = {};
    let sortBy: [string, SortOrder] = ['createdAt', -1];
    if (queryParams.search) {
      filter.$or = [
        { position: { $regex: queryParams.search, $options: 'i' } },
        { company: { $regex: queryParams.search, $options: 'i' } },
      ];
    }
    if (queryParams.jobStatus) {
      filter.jobStatus = queryParams.jobStatus;
    }
    if (queryParams.jobType) {
      filter.jobType = queryParams.jobType;
    }
    if (queryParams.workModel) {
      filter.workModel = queryParams.workModel;
    }
    if (queryParams.workModel) {
      filter.workModel = queryParams.workModel;
    }
    if (queryParams.sort) {
      const sortQuery = queryParams.sort;
      if (sortQuery === 'newest') sortBy = ['createdAt', -1];
      if (sortQuery === 'oldest') sortBy = ['createdAt', 1];
      if (sortQuery === 'a-z') {
        sortBy = ['position', 1];
      }
      if (sortQuery === 'z-a') {
        sortBy = ['position', -1];
      }
    }
    filter.createdBy = user?.userId;

    const jobs = await Job.find(filter)
      .collation({
        locale: 'en',
        strength: 2,
      })
      .sort([sortBy]);

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
    const {
      company,
      position,
      salary,
      jobLocation,
      workModel,
      jobStatus,
      jobType,
    } = req.body as IJob;

    const newJob = new Job({
      company,
      position,
      salary,
      jobLocation,
      createdBy: req.user?.userId,
      workModel,
      jobStatus,
      jobType,
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
