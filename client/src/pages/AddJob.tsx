import { Form, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import FormSelect from '../components/FormSelect';
import { useMemo } from 'react';
import Wrapper from '../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const jobStatus = useMemo(() => ['pending', 'declined', 'interview'], []);
  const jobType = useMemo(() => ['full-time', 'part-time', 'intership'], []);
  const workModel = useMemo(() => ['remote', 'onsite', 'hybrid'], []);

  const { state } = useNavigation();

  return (
    <Wrapper>
      <h2>Add Job</h2>
      <Form method='POST' className='form-component'>
        <FormRow
          label='Position'
          name='position'
          type='text'
          id='position'
          required
        />
        <FormRow
          label='company'
          name='company'
          type='text'
          id='company'
          required
        />
        <FormRow
          label='Job Location'
          name='jobLocation'
          type='text'
          id='jobLocation'
          required
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
        <button
          disabled={state === 'submitting'}
          className='btn btn-block'
          type='submit'
        >
          {state === 'submitting' ? 'Adding...' : 'Add Job'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
