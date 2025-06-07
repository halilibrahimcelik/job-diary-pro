import { createContext, useEffect, useState } from 'react';

type InitialStateType = {
  user: null | { name: string };
  showSidebar: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
};
const initialState: InitialStateType = {
  user: null,
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
  const user = {
    name: 'Halil',
  };

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
    console.log('Logout user');
  };
  const value = {
    showSidebar,
    isDarkMode,
    user,
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
