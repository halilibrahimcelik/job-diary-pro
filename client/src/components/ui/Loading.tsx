import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SpinnerIcon = styled(AiOutlineLoading3Quarters)`
  font-size: 2rem;
  color: var(--text-color);
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner: React.FC = () => {
  return (
    <LoadingWrapper>
      <SpinnerIcon />
    </LoadingWrapper>
  );
};

export default LoadingSpinner;
