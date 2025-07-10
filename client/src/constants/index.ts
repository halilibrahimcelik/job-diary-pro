export const ROUTES_PATHS = {
  HOME: '/',
  REGISTER: 'register',
  LOGIN: 'login',
  ERROR: '/error',
  DASHBOARD: 'dashboard',
  PROFILE: 'profile',
  STATS: 'stats',
  DELETE_JOBS: 'delete-jobs',
  ALL_JOBS: 'jobs',
  ADD_JOB: 'add-job',
  EDIT_JOB: 'edit-job/:id',
  ADMIN: 'admin',
};

export const COLORS = {
  'green-900': '#18662d',
  'green-100': '#64F58D',
  'green-400': '#64f58d4e',
  'purple-900': '#78279a',
  'purple-400': '#de9cfb',
  'purple-100': '#F5E5FC',
  'yellewGreen-900': '#abce4b',
  'yellowGreen-100': '#e0fa98',
  'yellowGreen-400': '#e0fa98a8',
};

export type RoutePaths = typeof ROUTES_PATHS;
