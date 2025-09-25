import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Automation from './pages/Automation'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Automation /> }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App