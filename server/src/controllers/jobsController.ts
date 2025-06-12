import { Request, Response, NextFunction } from 'express';
import { IJob, Job } from '../models/JobModel.js';
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
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
      res.status(400).json({
        message: 'Data is missing',
      });
      return;
    }

    const newJob = new Job({
      company,
      position,
    });

    await newJob.save();
    res.status(201).json({
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
    if (!jobId) {
      return res.status(404).json({
        message: 'No Job Found',
      });
    }
    const selectedJob = await Job.findById(jobId).exec();
    if (!selectedJob) {
      return res.status(404).json({
        message: 'No Job Found',
      });
    }
    res.status(200).json({
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
    if (!jobId) {
      res.status(404).json({
        message: 'No Job Found',
      });
      return;
    }
    const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
    if (!job) {
      res.status(404).json({
        message: 'No Job Found in the database ',
      });
      return;
    }

    res.status(201).json({
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

    if (!jobId) {
      res.status(404).json({
        message: 'No Job Found',
      });
      return;
    }
    const jobIndex = await Job.findById(jobId);
    if (!jobIndex) {
      res.status(404).json({
        message: 'No job position found with ID ' + jobId,
      });
      return;
    }

    await Job.deleteOne({ _id: jobId });

    res.status(201).json({
      message: 'Job has been removed from the list',
    });
  } catch (error) {
    next(error);
  }
};
