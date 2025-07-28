import styled from 'styled-components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { IoFilter } from 'react-icons/io5';
import FormRow from './FormRow';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FormSelect from './FormSelect';
import { debounceFn } from '../utils';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import type {
  IJob,
  JobResponse,
  JobStatus,
  JobType,
  SortJobs,
  WorkModel,
} from '../types';
import { apiService } from '../api/actions';
import { useQuery } from '@tanstack/react-query';

const CustomWrapper = styled(Wrapper)`
  h4 {
    display: flex;
    align-items: center;
  }
  .mt-4 {
    margin-top: 24px;
  }
`;
type Props = {
  allJobs: IJob[];
};
const SearchContainer: React.FC<Props> = ({ allJobs }) => {
  const searchedFieldRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobStatus, setJobStatus] = useState<JobStatus>('all');
  const [workModel, setWorkModel] = useState<WorkModel>('all');
  const [jobType, setJobType] = useState<JobType>('all');
  const [sortBy, setSortBy] = useState<SortJobs>('newest');
  const { setJobs, setPageInfo, pageInfo } = useJobs();

  const jobStatusList = useMemo(
    () => ['all', 'pending', 'declined', 'interview'],
    []
  );
  const jobTypeList = useMemo(
    () => ['all', 'full-time', 'part-time', 'intership'],
    []
  );
  const workModelList = useMemo(
    () => ['all', 'remote', 'onsite', 'hybrid'],
    []
  );
  const sortByList = useMemo(() => ['newest', 'oldest', 'a-z', 'z-a'], []);

  const searchedQuery = searchParams.get('search')?.toLowerCase().trim();
  const jobStatusQuery = searchParams.get('jobStatus')?.toLowerCase().trim();
  const jobTypeQuery = searchParams.get('jobType')?.toLowerCase().trim();
  const workModelQuery = searchParams.get('workModel')?.toLowerCase().trim();
  const sortByQuery = searchParams.get('sort')?.toLowerCase().trim();
  const pageQuery = searchParams.get('page')?.toLowerCase().trim();
  const jobDeletedQuery = searchParams.get('jobDeleted')?.toLowerCase().trim();
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('search', value);
        params.set('page', '1'); // Reset to page 1 when searching
        return params;
      });
    },
    [setSearchParams]
  );
  const handleJobStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setJobStatus(value as JobStatus);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('jobStatus', value);
      params.set('page', '1'); // Reset to page 1 when filtering
      return params;
    });
  };
  const handleJobType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setJobType(value as JobType);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('jobType', value);
      params.set('page', '1'); // Reset to page 1 when filtering
      return params;
    });
  };
  const handleWorkStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setWorkModel(value as WorkModel);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('workModel', value);
      params.set('page', '1'); // Reset to page 1 when filtering
      return params;
    });
  };
  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value as SortJobs);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('sort', value);
      params.set('page', '1'); // Reset to page 1 when sorting
      return params;
    });
  };

  const debouncedSearch = useMemo(
    () =>
      debounceFn(
        (...args: unknown[]) =>
          handleSearch(args[0] as React.ChangeEvent<HTMLInputElement>),
        300
      ),
    [handleSearch]
  );

  const handleResetQueries = () => {
    if (searchedFieldRef.current) {
      searchedFieldRef.current.value = '';
    }
    setJobs(allJobs);
    setSearchParams();
  };
  // Create query key based on search parameters
  const queryKey = useMemo(() => {
    const params = new URLSearchParams();
    if (searchedQuery) params.append('search', searchedQuery);
    if (jobStatusQuery) params.append('jobStatus', jobStatusQuery);
    if (jobTypeQuery) params.append('jobType', jobTypeQuery);
    if (workModelQuery) params.append('workModel', workModelQuery);
    if (sortByQuery) params.append('sort', sortByQuery);
    if (pageQuery) params.append('page', pageQuery);

    return ['jobs', params.toString()];
  }, [
    searchedQuery,
    jobStatusQuery,
    jobTypeQuery,
    workModelQuery,
    sortByQuery,
    pageQuery,
  ]);
  // Replace the useEffect with useQuery
  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchedQuery) params.append('search', searchedQuery);
      if (jobStatusQuery) params.append('jobStatus', jobStatusQuery);
      if (jobTypeQuery) params.append('jobType', jobTypeQuery);
      if (workModelQuery) params.append('workModel', workModelQuery);
      if (sortByQuery) params.append('sort', sortByQuery);
      if (pageQuery) params.append('page', pageQuery);

      const response = await apiService.get<JobResponse>(
        '/jobs?' + params.toString()
      );
      return response.data;
    },
    enabled:
      jobDeletedQuery !== 'true' ||
      (jobDeletedQuery && jobDeletedQuery === 'true'),
  });
  useEffect(() => {
    if (data) {
      setJobs(data.data);
      setPageInfo({
        page: data.page,
        total: data.total,
        totalPage: data.totalPage,
      });
    }
  }, [data, setJobs, setPageInfo]);

  return (
    <CustomWrapper>
      <h4>
        <IoFilter className='icon' /> Filter
      </h4>
      <div className='form-component'>
        <FormRow
          ref={searchedFieldRef}
          onChange={debouncedSearch}
          label='Search'
          id='search'
          name='search'
          type='search'
        />
        <FormSelect
          label='Job Status'
          name='jobStatus'
          value={jobStatus}
          onChange={handleJobStatus}
          optionList={jobStatusList}
          id='jobStatus'
          required
        />
        <FormSelect
          label='Job Type'
          name='jobType'
          optionList={jobTypeList}
          onChange={handleJobType}
          value={jobType}
          id='jobType'
          required
        />
        <FormSelect
          label='Work Model'
          name='workModel'
          optionList={workModelList}
          onChange={handleWorkStatus}
          value={workModel}
          id='workModel'
          required
        />
        <FormSelect
          label='Sort'
          name='sort'
          optionList={sortByList}
          onChange={handleSortBy}
          value={sortBy}
          id='sort'
          required
        />
        <button onClick={handleResetQueries} className='btn btn-block'>
          Reset
        </button>
      </div>
      <h4 className='mt-4'>
        {' '}
        {pageInfo.total} {pageInfo.total > 1 ? 'Jobs' : 'Job'} Found
      </h4>
    </CustomWrapper>
  );
};
export default SearchContainer;
