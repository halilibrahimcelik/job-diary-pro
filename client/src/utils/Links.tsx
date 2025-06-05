import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { ROUTES_PATHS } from '../constants';

export const links = [
  {
    text: 'add jobs',
    path: '.',
    icon: <FaWpforms />,
  },
  {
    text: 'all jobs',
    path: ROUTES_PATHS.ALL_JOBS,
    icon: <MdQueryStats />,
  },
  {
    text: 'stats',
    path: ROUTES_PATHS.STATS,
    icon: <IoBarChartSharp />,
  },
  {
    text: 'admin',
    path: ROUTES_PATHS.ADMIN,
    icon: <MdAdminPanelSettings />,
  },
  {
    text: 'profile',
    path: ROUTES_PATHS.PROFILE,
    icon: <ImProfile />,
  },
];
