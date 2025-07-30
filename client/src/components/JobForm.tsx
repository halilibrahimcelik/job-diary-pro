import { useMemo } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import FormSelect from '../components/FormSelect';
import Wrapper from './wrappers/DashboardFormPage';
import { useCompanyInfo, type CompanyInfo } from '../hooks/useCompanyInfo';
import CompanyUrlInput from './CompanyUrlInput';

type Props = {
  position?: string;
  jobLocation?: string;
  company?: CompanyInfo;
  jobType?: string;
  jobStatus?: string;
  workModel?: string;
  submitButtonLabel: string;
  submittingLabel: string;
};
const JobForm: React.FC<Props> = ({
  jobLocation,
  jobStatus,
  company,
  jobType,
  position,
  workModel,
  submitButtonLabel,
  submittingLabel,
}) => {
  const { state } = useNavigation();

  const jobStatusList = useMemo(() => ['pending', 'declined', 'interview'], []);
  const jobTypeList = useMemo(
    () => ['full-time', 'part-time', 'intership'],
    []
  );
  const workModelList = useMemo(() => ['remote', 'onsite', 'hybrid'], []);
  const { companyInfo, loading, fetchCompanyInfo } = useCompanyInfo();
  return (
    <Wrapper>
      <h2>{submitButtonLabel} Job</h2>
      <Form method='POST' className='form-component'>
        <FormRow
          label='Position'
          name='position'
          type='text'
          id='position'
          defaultValue={position ? position : ''}
          required
        />
        <CompanyUrlInput
          companyInfo={companyInfo ? companyInfo : company!}
          loading={loading}
          id='company'
          label='company website'
          name='company'
          fetchCompanyInfo={fetchCompanyInfo}
        />
        <input
          readOnly
          name='companyDomain'
          hidden
          value={companyInfo?.domain ? companyInfo.domain : company?.domain}
        />
        <input
          readOnly
          name='companyName'
          hidden
          value={companyInfo?.name ? companyInfo?.name : company?.name}
        />
        <input
          readOnly
          name='companyLogo'
          hidden
          value={companyInfo?.logo ? companyInfo?.logo : company?.logo}
        />
        <input
          readOnly
          name='companyUrl'
          hidden
          value={companyInfo?.fullUrl ? companyInfo?.fullUrl : company?.fullUrl}
        />

        <FormRow
          label='Job Location'
          name='jobLocation'
          type='text'
          id='jobLocation'
          defaultValue={jobLocation ? jobLocation : ''}
          required
        />

        <FormSelect
          label='Job Status'
          name='jobStatus'
          optionList={jobStatusList}
          id='jobStatus'
          defaultValue={jobStatus ? jobStatus : ''}
          required
        />
        <FormSelect
          label='Job Type'
          name='jobType'
          optionList={jobTypeList}
          defaultValue={jobType ? jobType : ''}
          id='jobType'
          required
        />
        <FormSelect
          label='Work Model'
          name='workModel'
          optionList={workModelList}
          defaultValue={workModel ? workModel : ''}
          id='workModel'
          required
        />
        <button
          disabled={state === 'submitting'}
          className='btn btn-block'
          type='submit'
        >
          {state === 'submitting' ? submittingLabel : submitButtonLabel}
        </button>
      </Form>
    </Wrapper>
  );
};
export default JobForm;
