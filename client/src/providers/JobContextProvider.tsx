import { createContext, useState } from 'react';
import type { IJob } from '../types';

type InitialStateType = {
  jobs: IJob[];
  setJobs: React.Dispatch<React.SetStateAction<IJob[]>>;
};
const initialState: InitialStateType = {
  jobs: [],
  setJobs: () => {},
};
// eslint-disable-next-line react-refresh/only-export-components
export const JobContext = createContext<InitialStateType>(initialState);

type Props = {
  children: React.ReactNode;
};

export const JobContextProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const value = {
    jobs,
    setJobs,
  };
  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
