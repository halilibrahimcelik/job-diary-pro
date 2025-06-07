import { useState } from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDashboard } from '../hooks/useDashboard';

const LogoutContainer: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboard();

  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <Wrapper>
      <button
        onClick={toggleShowLogout}
        type='button'
        className='btn logout-btn'
      >
        <FaUserCircle className='img' />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='btn dropdown-btn' onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
