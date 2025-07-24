import { Link, useParams, type LoaderFunctionArgs } from 'react-router-dom';
import { AxiosError } from 'axios';
import JobForm from '../components/JobForm';
import { ROUTES_PATHS } from '../constants';
import styled from 'styled-components';
import { queryClient } from '../utils/queryClient';
import { getSingleJobQuery } from '../api/queries';
import { useQuery } from '@tanstack/react-query';

export const EditJobsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { jobId } = params;
  try {
    const response = await queryClient.ensureQueryData(
      getSingleJobQuery(jobId!)
    );
    return response;
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
  const params = useParams();
  const { data } = useQuery(getSingleJobQuery(params.jobId!));

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
