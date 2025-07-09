import { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDashboard } from '../hooks/useDashboard';
import { useLoaderData } from 'react-router-dom';
import type { UserResponse } from '../types';

const LogoutContainer: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser, setRole } = useDashboard();
  const data = useLoaderData<UserResponse>();
  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };
  useEffect(() => {
    if (data.data.role) {
      setRole(data.data.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <button
        onClick={toggleShowLogout}
        type='button'
        className='btn logout-btn'
      >
        <FaUserCircle className='img' />
        {data.data.name}
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
