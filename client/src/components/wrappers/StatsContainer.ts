import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  column-gap: 1rem;
  .col-span-3 {
    grid-column: span 3;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .col-span-3 {
      grid-column: span 1;
    }
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export default Wrapper;
