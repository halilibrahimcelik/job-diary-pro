import { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';
import { apiService } from '../api/actions';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATHS } from '../constants';

type InitialStateType = {
  showSidebar: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
};
const initialState: InitialStateType = {
  showSidebar: false,
  isDarkMode: false,
  toggleDarkMode: () => {},
  toggleSidebar: () => {},
  logoutUser: async () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
};

const DashboardProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
      const response = await apiService.get('/auth/logout');
      console.log(response);
      if (response.status === 200) {
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
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
