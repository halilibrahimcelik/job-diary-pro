import mongoose, { Schema, model } from 'mongoose';
import { JobStatus, JobType, WorkModel } from '../types/index.js';

interface CompanyInfo {
  name: string;
  logo: string;
  domain: string;
  fullUrl: string;
}

export interface IJob {
  position: string;
  company: CompanyInfo;
  salary?: number;
  jobStatus: JobStatus.INTERVİEW | JobStatus.DECLINED | JobStatus.PENDING;
  jobType: JobType.FULL_TIME | JobType.PART_TIME | JobType.INTERSHIP;
  workModel: WorkModel.HYBRID | WorkModel.ONSITE | WorkModel.REMOTE;
  jobLocation: string;
  createdBy: any;
}

const JobSchema = new Schema<IJob>(
  {
    company: {
      name: {
        type: String,
      },
      logo: {
        type: String,
      },
      domain: {
        type: String,
      },
      fullUrl: {
        type: String,
      },
    },
    position: {
      type: String,
    },
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
    workModel: {
      type: String,
      enum: [WorkModel.HYBRID, WorkModel.ONSITE, WorkModel.REMOTE],
      default: WorkModel.ONSITE,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Job = model<IJob>('Job', JobSchema);
