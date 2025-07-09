import { createContext, useState } from 'react';
import type { IJob } from '../types';

type PageInfo = {
  page: number;
  total: number;
  totalPage: number;
};
type InitialStateType = {
  jobs: IJob[];
  setJobs: React.Dispatch<React.SetStateAction<IJob[]>>;
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo>>;
  pageInfo: PageInfo;
};
const initialState: InitialStateType = {
  jobs: [],
  setJobs: () => {},
  pageInfo: {
    page: 0,
    total: 0,
    totalPage: 0,
  },
  setPageInfo: () => {},
};
// eslint-disable-next-line react-refresh/only-export-components
export const JobContext = createContext<InitialStateType>(initialState);

type Props = {
  children: React.ReactNode;
};

export const JobContextProvider = ({ children }: Props) => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 0,
    total: 0,
    totalPage: 0,
  });
  const value = {
    jobs,
    setJobs,
    pageInfo,
    setPageInfo,
  };
  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
