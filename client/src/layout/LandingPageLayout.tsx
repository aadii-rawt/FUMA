import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LandingPageLayout = () => {
    return (
        <div className='relative'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LandingPageLayout