import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.tsx'
import Signup from './routes/Signup.tsx'
import Dashboard from './routes/Dashboard.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import Profile from './routes/Profile.tsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Login />, 
    errorElement: <div>404</div>
  },
  { 
    path: '/signup', 
    element: <Signup />, 
    errorElement: <div>404</div>
  },
  { 
    path: '/', 
    element: <ProtectedRoute />, 
    children: [
      { 
        path: '/dashboard', 
        element: <Dashboard />, 
        errorElement: <div>404</div>
      },
      {
        path: '/me',
        element: <Profile />,
        errorElement: <div>404</div>
      },
    ],
  },
  
  // Para redireccionar las rutas si es un 404 se tiene que hacer lo siguiente
  {
    path: '*',
    element: <div>404</div>
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
