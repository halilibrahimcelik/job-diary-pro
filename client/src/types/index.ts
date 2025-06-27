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
  data: IJob;
};

export type JobStatus = 'pending' | 'interview' | 'declined';
export type JobType = 'full-time' | 'part-time' | 'internship';

export interface ICreateJobResponse {
  message: string;
  data: IJob;
}
