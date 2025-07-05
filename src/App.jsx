import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import Link from './pages/link'
import RedirectLink from './pages/redirect-link'
import Auth from './pages/auth'
import AppLayout from './Layouts/app-layout'
import LandingPage from './pages/landing'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'

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
        element:(
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        )
      },
      {
        path: '/link/:id',
        element:(
          <RequireAuth>
            <Link />
          </RequireAuth>
        )
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
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
