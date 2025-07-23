import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios';
import { apiService } from '../api/actions';
import type { IJob, JobResponse } from '../types';
import JobForm from '../components/JobForm';
import { ROUTES_PATHS } from '../constants';
import styled from 'styled-components';

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .btn-back {
    display: inline-block;
    width: fit-content;
    align-self: flex-end;
  }
`;
const EditJob = () => {
  const data = useLoaderData<IJob>();
  return (
    <Wrapper>
      <JobForm
        submitButtonLabel='Edit'
        company={data.company}
        submittingLabel='Editting...'
        jobLocation={data.jobLocation}
        jobStatus={data.jobStatus}
        jobType={data.jobType}
        position={data.position}
        workModel={data.workModel}
      />
      <button className='btn btn-back'>
        <Link to={'/' + ROUTES_PATHS.DASHBOARD + '/' + ROUTES_PATHS.ALL_JOBS}>
          Back
        </Link>
      </button>
    </Wrapper>
  );
};
export default EditJob;
