import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SK from './SK.jsx'
import KJ from './KJ.jsx'
import OG from './OG.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sk',
    element: <SK />,
  },
  {
    path: '/kj',
    element: <KJ />,
  },
  {
    path: '/og',
    element: <OG />,
  },   
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
