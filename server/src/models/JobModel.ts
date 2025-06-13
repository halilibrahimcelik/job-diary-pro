import { Schema, model } from 'mongoose';
import { JobStatus, JobType } from '../types/index.js';

export interface IJob {
  position: string;
  company: string;
  location?: string;
  salary?: number;
  jobStatus: JobStatus.INTERVİEW | JobStatus.DECLINED | JobStatus.PENDING;
  jobType: JobType.FULL_TIME | JobType.PART_TIME | JobType.INTERSHIP;
  jobLocation: string;
}

const JobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: String,
    salary: {
      type: Number,
    },
    jobStatus: {
      type: String,
      enum: [JobStatus.INTERVİEW, JobStatus.DECLINED, JobStatus.PENDING],
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: [JobType.FULL_TIME, JobType.PART_TIME, JobType.INTERSHIP],
      default: JobType.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  {
    timestamps: true,
  }
);

export const Job = model<IJob>('Job', JobSchema);
