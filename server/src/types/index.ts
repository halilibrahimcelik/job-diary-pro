export interface Job {
  id: string;
  position: string;
  company: string;
  location: string;
  salary: number;
}
export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  INTERSHIP = 'intership',
}
export enum JobStatus {
  INTERVİEW = 'interview',
  DECLINED = 'declined',
  PENDING = 'pending',
}
