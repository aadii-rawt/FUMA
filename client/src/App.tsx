
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
import ConnectInsta from './pages/auth/ConnectInsta'
import { Authenticate } from './utils/Authenticate'
import About from './pages/About'
import NotFound from './pages/404'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BillingHistory from './pages/settings/BillingHistory'

const App = () => {
  const router = createBrowserRouter([
    {
      path : "",
      element : <LandingPageLayout />,
      children : [
        { path : "/", element : <Home />},
        { path : "/about", element : <About />},
        { path : "/pricing", element : <Pricing />},
        { path : "/privacy-policy", element : <PrivacyPolicy />},
      ],
      errorElement : <NotFound />
    },
    {
      path: "",
      element:<Authenticate> <Layout /></Authenticate>,
      children: [
        { path: "/app", element: <Automation /> },
        { path: "/automation/new", element: <NewAutomation  /> }
      ],
        errorElement : <NotFound />
    },
    
    {
      path : "/setting",
      element : <Authenticate><SettingLayout /></Authenticate>,
      children : [
        {path : "/setting/general", element : <General />},
        {path : "/setting/billing", element : <Billing />},
      ],
        errorElement : <NotFound />
    },
    {
      path : "/setting/billing/history",
      element : <BillingHistory />
    },

    {
      path : "",
      element : <AuthLayout />,
      children : [
        { path : "/auth/login", element : <Login />},
        { path : "/auth/signup", element : <Signup />},
        { path : "/auth/verify", element : <VerifyOTP />},
        { path : "/auth/connect/instagram", element : <ConnectInsta />}
      ],
        errorElement : <NotFound />
    }
    
  ])
  
  return (
    <RouterProvider router={router} />
  )
}

export default App