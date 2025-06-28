import styled from 'styled-components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { IoFilter } from 'react-icons/io5';

const CustomWrapper = styled(Wrapper)`
  h4 {
    display: flex;
    align-items: center;
  }
`;
const SearchContainer: React.FC = () => {
  return (
    <CustomWrapper>
      <h4>
        <IoFilter className='icon' /> Filter
      </h4>
    </CustomWrapper>
  );
};
export default SearchContainer;
