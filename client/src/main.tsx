import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { JobContextProvider } from './providers/JobContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <JobContextProvider>
      <App />
    </JobContextProvider>
  </>
);
