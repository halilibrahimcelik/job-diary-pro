import { Request, Response, NextFunction } from 'express';
import { jobs } from '../app.js';
import { nanoid } from 'nanoid';
import { Job } from '../types/index.js';
export const getAllJobs = (req: Request, res: Response, next: NextFunction) => {
  throw new Error('No job provided ');
  res.status(200).json({
    message: 'Data send successfully!!',
    data: jobs,
  });
};
export const createJob = (req: Request, res: Response, next: NextFunction) => {
  const { company, location, position, salary } = req.body as Job;

  if (!company || !position) {
    res.status(400).json({
      message: 'Data is missing',
    });
    return;
  }

  const id = nanoid();

  const newJob = {
    id,
    company,
    location,
    position,
    salary,
  };
  jobs.push(newJob);

  res.status(201).json({
    message: 'Job has been created!',
    data: newJob,
  });
};

export const getSingleJob = (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  if (!jobId) {
    res.status(404).json({
      message: 'No Job Found',
    });
    return;
  }
  const selectedJob = jobs.filter((job) => job.id === jobId);
  if (selectedJob.length === 0) {
    res.status(200).json({
      message: 'There is no job with that ID ',
    });
  }
  res.status(200).json({
    message: 'Data fetched succesfully',
    data: selectedJob,
  });
};
export const editSingleJob = (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  console.log(jobId, 'job id');
  const { company, location, position, salary } = req.body as Job;
  if (!jobId) {
    res.status(404).json({
      message: 'No Job Found',
    });
    return;
  }
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex === -1) {
    res.status(400).json({
      message: 'No job position found with ID ' + jobId,
    });
    return;
  }
  const editedJob = {
    company: company || jobs[jobIndex].company,
    location: location || jobs[jobIndex].location,
    salary: salary || jobs[jobIndex].salary,
    position: position || jobs[jobIndex].position,

    id: jobId,
  };

  jobs[jobIndex] = editedJob;

  res.status(201).json({
    message: 'Your job with ID  ' + jobId + ' successfully edited',
    data: jobs,
  });
};

export const deletesingleJob = (req: Request, res: Response) => {
  const { jobId } = req.params;

  if (!jobId) {
    res.status(404).json({
      message: 'No Job Found',
    });
    return;
  }
  const jobIndex = jobs.findIndex((job) => job.id === jobId);
  if (jobIndex === -1) {
    res.status(400).json({
      message: 'No job position found with ID ' + jobId,
    });
    return;
  }

  const updatedJobs = jobs.filter((jobs) => jobs.id !== jobId);

  res.status(201).json({
    message: 'Job has been removed from the list',
    data: updatedJobs,
  });
};
