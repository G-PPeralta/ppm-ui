import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from 'context/Toast';

import { MainRoutes } from './routes';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
}
