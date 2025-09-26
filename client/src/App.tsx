import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Automation from './pages/Automation'
import NewAutomation from './pages/NewAutomation'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Automation /> },
        { path: "/automation/new", element: <NewAutomation  /> }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App