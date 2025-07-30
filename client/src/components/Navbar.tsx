import Wrapper from './wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboard } from '../hooks/useDashboard';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
const Navbar: React.FC = () => {
  const { toggleSidebar } = useDashboard();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button onClick={toggleSidebar} className='toggle-btn'>
          <FaAlignLeft />
        </button>
        <div>
          <div className='mobile-logo'>
            <Logo />
          </div>
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>{' '}
      </div>
    </Wrapper>
  );
};
export default Navbar;
