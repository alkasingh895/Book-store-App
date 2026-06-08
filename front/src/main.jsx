import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import AdminProvider from './context/AdminProvider.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <AuthProvider>
    <AdminProvider>
     {/* CHANGE: light mode par default text dark — book cards readable */}
     <div className='min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white'>
     <App />
     </div>
    </AdminProvider>
  </AuthProvider>
  </BrowserRouter>
    
  
)
