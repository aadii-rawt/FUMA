
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Automation from './pages/Automation'
import NewAutomation from './pages/NewAutomation'
import LandingPageLayout from './layout/LandingPageLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AuthLayout from './layout/AuthLayout'
import VerifyOTP from './pages/auth/VerifyOTP'
import Pricing from './pages/Pricing'
import SettingLayout from './layout/SettingLayout'
import General from './pages/settings/General'
import Billing from './pages/settings/Billing'
import ComingSoon from './components/ComingSoon'

const App = () => {
  const router = createBrowserRouter([
    {
      path : "",
      element : <LandingPageLayout />,
      children : [
        { path : "/", element : <Home />},
        { path : "/pricing", element : <Pricing />},
      ]
    },
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/app", element: <Automation /> },
        { path: "/automation/new", element: <NewAutomation  /> }
      ]
    },
    
    {
      path : "/setting",
      element : <SettingLayout />,
      children : [
        {path : "/setting/general", element : <General />},
        {path : "/setting/billing", element : <Billing />},
      ]
    },

    {
      path : "",
      element : <AuthLayout />,
      children : [
        { path : "/auth/login", element : <Login />},
        { path : "/auth/signup", element : <Signup />},
        { path : "/auth/verify", element : <VerifyOTP />}
      ]
    }
    
  ])
  
  if(import.meta.env.VITE_APP_ENVIRONMENT == "production"){
    return (<ComingSoon />)
  }
  return (
    <RouterProvider router={router} />
  )
}

export default App