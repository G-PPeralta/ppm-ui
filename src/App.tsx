import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'contexts/Auth';
import { ToastProvider } from 'contexts/Toast';

import { MainRoutes } from './routes';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
