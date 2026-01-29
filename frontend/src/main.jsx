import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import { AuthProvider } from './context/auth'; //
import ScrollToTop from './components/layout/ScrollToTop';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
    <AuthProvider>
        <ScrollToTop />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#020617',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
        <App />
    </AuthProvider>
      </BrowserRouter>
  </StrictMode>
);