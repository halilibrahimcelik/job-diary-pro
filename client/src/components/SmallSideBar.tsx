import { FaTimes } from 'react-icons/fa';
import Wrapper from './wrappers/SmallSidebar';
import Logo from './Logo';
import { useDashboard } from '../hooks/useDashboard';
import Navlinks from './Navlinks';

const SmallSideBar: React.FC = () => {
  const { toggleSidebar, showSidebar } = useDashboard();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className='content'>
          <button type='button' onClick={toggleSidebar} className='close-btn'>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSideBar;
