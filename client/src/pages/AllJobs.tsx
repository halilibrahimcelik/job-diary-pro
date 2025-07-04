import { AxiosError } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import type { JobResponse } from '../types';
import { SearchContainer } from '../components';
import { JobsContainer } from '../components';
import { PageContainer } from '../components';
import { useJobs } from '../hooks/useJobs';
import { useEffect } from 'react';

export const AllJobsLoader = async () => {
  try {
    const response = await apiService.get<JobResponse>('/jobs');
    //console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    return redirect('/');
  }
  return null;
};
const AllJobs = () => {
  const { data, page, totalPage } = useLoaderData<JobResponse>();
  const { setJobs, jobs } = useJobs();
  useEffect(() => {
    setJobs(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SearchContainer allJobs={data} />
      <JobsContainer jobs={jobs} />
      <PageContainer page={page} totalPage={totalPage} />
    </>
  );
};
export default AllJobs;
