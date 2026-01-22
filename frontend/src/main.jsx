import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/layout/ScrollToTop';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
