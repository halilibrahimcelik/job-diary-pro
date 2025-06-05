import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboard } from '../hooks/useDashboard';
const Navbar: React.FC = () => {
  const { toggleSidebar } = useDashboard();

  return (
    <Wrapper>
      <div className='nav-center'>
        <button onClick={toggleSidebar} className='toggle-btn'>
          <FaAlignLeft className='nav-icon' />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>Dashboard</h4>
        </div>
        <div className='btn-container'>toggle/Logout</div>{' '}
      </div>
    </Wrapper>
  );
};
export default Navbar;
