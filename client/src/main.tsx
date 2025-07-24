import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ReactQueryProvider from './providers/ReactQueryProvider.tsx';
import { JobContextProvider } from './providers/JobContextProvider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <JobContextProvider>
      <App />
    </JobContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </ReactQueryProvider>
);
