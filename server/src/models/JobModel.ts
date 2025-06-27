import mongoose, { Schema, model } from 'mongoose';
import { JobStatus, JobType, WorkModel } from '../types/index.js';

export interface IJob {
  position: string;
  company: string;
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
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
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
