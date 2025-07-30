import { useEffect, useState } from 'react';
import Wrapper from './wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDashboard } from '../hooks/useDashboard';
import { useQuery } from '@tanstack/react-query';
import { profileQuery } from '../api/queries';

const LogoutContainer: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { logoutUser, setRole } = useDashboard();
  const { data } = useQuery(profileQuery);
  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };
  useEffect(() => {
    if (data?.role) {
      setRole(data.role);
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
        {data?.image ? (
          <img
            className='img'
            src={data?.image}
            alt={data?.name + ' ' + 'image'}
          />
        ) : (
          <FaUserCircle className='img' />
        )}
        {data?.name}
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
