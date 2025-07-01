export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: 'admin' | 'user';
}
export interface IJob {
  company: string;
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
};

export type JobStatus = 'pending' | 'interview' | 'declined';
export type JobType = 'full-time' | 'part-time' | 'internship';
export type WorkModel = 'onsite' | 'remote' | 'hybrid';
export type SortJobs = 'newest' | 'oldest' | 'a-z' | 'z-a';

export interface ICreateJobResponse {
  message: string;
  data: IJob;
}
