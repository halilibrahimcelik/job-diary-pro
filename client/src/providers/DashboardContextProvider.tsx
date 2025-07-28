import { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';
import { apiService } from '../api/actions';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../constants';
import { queryClient } from '../utils/queryClient';

type InitialStateType = {
  showSidebar: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
  role: 'admin' | 'user';
  setRole: React.Dispatch<React.SetStateAction<'admin' | 'user'>>;
};
const initialState: InitialStateType = {
  showSidebar: false,
  isDarkMode: false,
  toggleDarkMode: () => {},
  toggleSidebar: () => {},
  logoutUser: async () => {},
  setRole: () => {},
  role: 'user',
};

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
};

const DashboardProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const navigate = useNavigate();
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      setIsDarkMode(darkMode === 'true');
      document.body.classList.toggle('dark-theme', darkMode === 'true');
    }
  }, []);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    try {
      queryClient.invalidateQueries();

      const response = await apiService.get('/auth/logout');
      if (response.status === 200) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpires');
        return navigate('/' + ROUTES_PATHS.LOGIN);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
    }
  };
  const value = {
    showSidebar,
    isDarkMode,
    toggleDarkMode,
    toggleSidebar,
    logoutUser,
    role,
    setRole,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
