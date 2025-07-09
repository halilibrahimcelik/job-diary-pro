import styled from 'styled-components';
import emptyImage from '../assets/images/empty.svg';
const Wrapper = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  p {
    font-size: 1.25rem;
  }
  img {
    max-width: 300px;
  }
`;
const EmptyState: React.FC = () => {
  return (
    <Wrapper>
      <p>No jobs found. Try adjusting your search or add a new job.</p>
      <img src={emptyImage} />
    </Wrapper>
  );
};
export default EmptyState;
