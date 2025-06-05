import { useContext } from 'react';
import { DashboardContext } from '../providers/DashboardContextProvider';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    );
  }
  return context;
};
