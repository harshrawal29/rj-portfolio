import { createBrowserRouter } from 'react-router-dom'
import RouteErrorPage from './components/errors/RouteErrorPage'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'work',
        children: [
          {
            index: true,
            lazy: async () => {
              const module = await import('./pages/work/WorkIndexPage')
              return {
                Component: module.Component,
                loader: module.loader,
              }
            },
          },
          {
            path: ':project',
            lazy: async () => {
              const module = await import('./pages/work/WorkProjectPage')
              return {
                Component: module.Component,
                loader: module.loader,
              }
            },
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
