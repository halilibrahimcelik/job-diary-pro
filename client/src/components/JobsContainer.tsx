import Wrapper from '../assets/wrappers/JobsContainer';
import type { IJob } from '../types';
import Job from './Job';

type Props = {
  jobs: IJob[];
};
const JobsContainer: React.FC<Props> = ({ jobs }) => {
  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job job={job} />;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
