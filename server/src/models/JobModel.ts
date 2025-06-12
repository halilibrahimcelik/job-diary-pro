import { Schema, model } from 'mongoose';

export interface IJob {
  position: string;
  company: string;
  location?: string;
  salary?: number;
  jobStatus: 'interview' | 'declined' | 'pending';
  jobType: 'full-time' | 'part-time' | 'intership';
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
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'intership'],
      default: 'full-time',
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
