import { useContext } from 'react';
import { JobContext } from '../providers/JobContextProvider';

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error('Job context is not defined');
  return context;
};
