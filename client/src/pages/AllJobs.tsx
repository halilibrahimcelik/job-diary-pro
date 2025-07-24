import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from 'sonner';
import { SearchContainer } from '../components';
import { JobsContainer } from '../components';
import { PageContainer } from '../components';
import { useJobs } from '../hooks/useJobs';
import EmptyState from '../components/EmptyState';
import { queryClient } from '../utils/queryClient';
import { allJobsQuery } from '../api/queries';

export const AllJobsLoader = async () => {
  try {
    const response = await queryClient.ensureQueryData(allJobsQuery);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    return redirect('/');
  }
};
const AllJobs = () => {
  // const { data, page, totalPage } = useLoaderData<JobResponse>();
  // const { data } = useQuery(allJobsQuery);

  const { jobs, pageInfo } = useJobs();
  // useEffect(() => {
  //   setJobs(data?.data ? data?.data : []);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <SearchContainer allJobs={jobs} />
      {pageInfo.total === 0 ? (
        <EmptyState />
      ) : (
        <>
          <JobsContainer jobs={jobs} />
          <PageContainer
            page={pageInfo?.page || 1}
            totalPage={pageInfo?.totalPage || 0}
          />
        </>
      )}
    </>
  );
};
export default AllJobs;
