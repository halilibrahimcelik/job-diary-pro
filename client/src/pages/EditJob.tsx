import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios';
import { apiService } from '../api/actions';
import type { IJob, JobResponse } from '../types';
import JobForm from '../components/JobForm';

export const EditJobsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { jobId } = params;
  try {
    const response = await apiService.get<JobResponse>(`/jobs/${jobId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
  }
};
const EditJob = () => {
  const data = useLoaderData<IJob>();
  return (
    <JobForm
      submitButtonLabel='Edit'
      submittingLabel='Editting...'
      jobLocation={data.jobLocation}
      jobStatus={data.jobStatus}
      jobType={data.jobType}
      position={data.position}
      workModel={data.workModel}
    />
  );
};
export default EditJob;
