import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import RedirectLink from './pages/redirect-link'
import Auth from './pages/auth'
import AppLayout from './Layouts/app-layout'
import LandingPage from './pages/landing'

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path: '/',
        element:<LandingPage />
      },
      {
        path: '/dashboard',
        element:<Dashboard />
      },
      {
        path: '/link/:id',
        element:<Link />
      },
      {
        path: '/:id',
        element:<RedirectLink />
      },
      {
        path: '/auth',
        element:<Auth />
      },
    ]
  }
])

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
