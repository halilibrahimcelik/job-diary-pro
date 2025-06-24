import styled from 'styled-components';

const Wrapper = styled.section`
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
export default Wrapper;
