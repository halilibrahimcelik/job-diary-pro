import { AxiosError } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import type { JobResponse } from '../types';
import SearchContainer from '../components/SearchContainer';
import JobsContainer from '../components/JobsContainer';

export const AllJobsLoader = async () => {
  try {
    const response = await apiService.get<JobResponse>('/jobs');
    console.log(response);
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
  const { data } = useLoaderData<JobResponse>();
  console.log(data);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;
