import styled from 'styled-components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { IoFilter } from 'react-icons/io5';
import FormRow from './FormRow';
import { useCallback, useEffect, useMemo } from 'react';
import FormSelect from './FormSelect';
import { debounceFn } from '../utils';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import type { IJob } from '../types';

const CustomWrapper = styled(Wrapper)`
  h4 {
    display: flex;
    align-items: center;
  }
`;
type Props = {
  allJobs: IJob[];
};
const SearchContainer: React.FC<Props> = ({ allJobs }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setJobs } = useJobs();

  const jobStatus = useMemo(() => ['pending', 'declined', 'interview'], []);
  const jobType = useMemo(() => ['full-time', 'part-time', 'intership'], []);
  const workModel = useMemo(() => ['remote', 'onsite', 'hybrid'], []);
  const sortBy = useMemo(() => ['newest', 'oldest', 'a-z', 'z-a'], []);
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchParams({ search: value });
    },
    [setSearchParams]
  );
  const debouncedSearch = useMemo(
    () =>
      debounceFn(
        (...args: unknown[]) =>
          handleSearch(args[0] as React.ChangeEvent<HTMLInputElement>),
        300
      ),
    [handleSearch]
  );
  const searchedQuery = searchParams.get('search')?.toLowerCase().trim();
  useEffect(() => {
    if (searchedQuery && allJobs) {
      const searchedJobs = allJobs.filter((job) => {
        if (
          job.company.toLowerCase().includes(searchedQuery) ||
          job.position.toLowerCase().includes(searchedQuery)
        ) {
          return job;
        }
      });
      setJobs(searchedJobs);
    }
    if (searchedQuery === '') {
      setJobs(allJobs);
    }
  }, [searchedQuery, setJobs, allJobs]);
  return (
    <CustomWrapper>
      <h4>
        <IoFilter className='icon' /> Filter
      </h4>
      <div className='form-component'>
        <FormRow
          onChange={debouncedSearch}
          label='Search'
          id='search'
          name='search'
          type='search'
        />
        <FormSelect
          label='Job Status'
          name='jobStatus'
          optionList={jobStatus}
          id='jobStatus'
          required
        />
        <FormSelect
          label='Job Type'
          name='jobType'
          optionList={jobType}
          id='jobType'
          required
        />
        <FormSelect
          label='Work Model'
          name='workModel'
          optionList={workModel}
          id='workModel'
          required
        />
        <FormSelect
          label='Sort'
          name='sort'
          optionList={sortBy}
          id='sort'
          required
        />
        <button className='btn btn-block'>Reset</button>
      </div>
    </CustomWrapper>
  );
};
export default SearchContainer;
