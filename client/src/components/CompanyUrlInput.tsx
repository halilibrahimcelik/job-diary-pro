import { useState } from 'react';
import styled from 'styled-components';
import type { CompanyInfo } from '../hooks/useCompanyInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingText = styled.div`
  font-size: 0.875rem;
  color: var(--grey-500);
`;

const CompanyPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  //  background-color: var(--grey-50);
  border-radius: 0.375rem;
  border: 1px solid var(--white);
`;

const CompanyLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  object-fit: contain;
  background-color: var(--white);
  border: 1px solid var(--grey-200);
`;

const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CompanyName = styled.h1`
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
  font-size: 1rem;
`;

const CompanyUrl = styled.p`
  font-size: 0.875rem;
  color: var(--grey-400);
  margin: 0;
  word-break: break-all;
`;

interface Props {
  companyInfo: CompanyInfo;
  loading: boolean;
  fetchCompanyInfo: (url: string) => Promise<void>;
  label: string;
  id: string;
  defaultValue?: string;
  name?: string;
}

const CompanyUrlInput = ({
  companyInfo,
  loading,
  fetchCompanyInfo,
  label,
  id,
  defaultValue,
  name,
}: Props) => {
  const [url, setUrl] = useState<string | undefined>(defaultValue);

  const handleCompanyUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const websiteUrl = e.target.value;
    setUrl(websiteUrl);

    fetchCompanyInfo(websiteUrl);
  };

  return (
    <Container>
      <InputContainer className='form-row'>
        <label htmlFor='companyUrl' className='form-label'>
          {label}
        </label>
        <input
          className='form-input'
          id={id}
          type='text'
          name={name}
          value={url || ''}
          onChange={handleCompanyUrlChange}
          placeholder='https://company.com'
        />
      </InputContainer>

      {loading && <LoadingText>Fetching company info...</LoadingText>}

      {companyInfo?.name && (
        <CompanyPreview>
          <CompanyLogo
            src={companyInfo.logo}
            alt={`${companyInfo.name} logo`}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-logo.png';
            }}
          />
          <CompanyDetails>
            <CompanyName>{companyInfo.name}</CompanyName>
            <CompanyUrl>{url}</CompanyUrl>
          </CompanyDetails>
        </CompanyPreview>
      )}
    </Container>
  );
};

export default CompanyUrlInput;
