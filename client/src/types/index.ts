import type { CompanyInfo } from '../hooks/useCompanyInfo';

export interface IUser {
  name: string;
  email: string;
  image: string;
  password: string;
  lastName: string;
  location: string;
  role: 'admin' | 'user';
}
export interface IJob {
  company: CompanyInfo;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  workModel: string;
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export type UserResponse = {
  messsage: string;
  data: IUser;
};
export type JobResponse = {
  message: string;
  data: IJob[];
  page: number;
  total: number;
  totalPage: number;
};
export type JobSingleResponse = {
  message: string;
  data: IJob;
  page: number;
  total: number;
  totalPage: number;
};
export type AdminStatType = {
  jobs: number;
  message: string;
  users: number;
};

export type JobStatus = 'all' | 'pending' | 'interview' | 'declined';
export type JobType = 'all' | 'full-time' | 'part-time' | 'internship';
export type WorkModel = 'all' | 'onsite' | 'remote' | 'hybrid';
export type SortJobs = 'newest' | 'oldest' | 'a-z' | 'z-a';

export interface ICreateJobResponse {
  message: string;
  data: IJob;
}
