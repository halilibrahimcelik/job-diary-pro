/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import type { CompanyInfo } from '../hooks/useCompanyInfo';
import { debounceFn } from '../utils';
import placeholder from '../assets/images/placeholder-image.jpg';
import { FiExternalLink } from 'react-icons/fi';

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
  /* Single animation on parent - affects all children */
  animation: slideInFade 0.4s ease-out;

  @keyframes slideInFade {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
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
  gap: 7px;
  flex: 1;
`;

const CompanyName = styled.h1`
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
  font-size: 1rem;
`;

const CompanyUrl = styled.a`
  font-size: 0.875rem;
  display: inline-flex;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  color: var(--grey-400);
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
  word-break: break-all;
`;

interface Props {
  companyInfo: CompanyInfo;
  loading: boolean;
  fetchCompanyInfo: (url: string) => Promise<void>;
  label: string;
  id: string;

  name?: string;
}

const CompanyUrlInput = ({
  companyInfo,
  loading,
  fetchCompanyInfo,
  label,
  id,

  name,
}: Props) => {
  const [url, setUrl] = useState<string | undefined>(companyInfo?.fullUrl);

  const debouncedFetchCompanyInfo = useMemo(
    //@ts-ignore
    () => debounceFn(fetchCompanyInfo, 600),
    [fetchCompanyInfo]
  );

  const handleCompanyUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const websiteUrl = e.target.value;
      setUrl(websiteUrl);

      debouncedFetchCompanyInfo(websiteUrl);
    },
    [debouncedFetchCompanyInfo]
  );
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
              e.currentTarget.src = placeholder;
            }}
          />
          <CompanyDetails>
            <CompanyName>{companyInfo.name}</CompanyName>
            <CompanyUrl target='_blank' href={companyInfo.fullUrl}>
              {url} <FiExternalLink />
            </CompanyUrl>
          </CompanyDetails>
        </CompanyPreview>
      )}
    </Container>
  );
};

export default CompanyUrlInput;
