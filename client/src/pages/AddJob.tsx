import { Form } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow } from '../components';
import FormSelect from '../components/FormSelect';
import { useMemo } from 'react';

const Wrapper = styled.div`
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  border-radius: 10px;
  padding: 40px 20px;
  .add-job-form {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 20px;
    button {
      height: fit-content;
      align-self: flex-end;
    }
    .form-row {
      margin: 0px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .add-job-form {
      grid-template-columns: 1fr;
    }
  }
`;

const AddJob = () => {
  const jobStatus = useMemo(() => ['pending', 'declined', 'interview'], []);
  const jobType = useMemo(() => ['full-time', 'part-time', 'intership'], []);
  return (
    <Wrapper>
      <h2>Add Job</h2>
      <Form method='POST' className='add-job-form'>
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
        <button className='btn btn-block' type='submit'>
          Add Job
        </button>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
