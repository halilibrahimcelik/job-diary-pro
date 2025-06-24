export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: 'admin' | 'user';
}
export type UserResponse = {
  messsage: string;
  data: IUser;
};

export type JobStatus = 'pending' | 'interview' | 'declined';
export type JobType = 'full-time' | 'part-time' | 'internship';
