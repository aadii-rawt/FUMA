import {Outlet} from 'react-router-dom'
import Header from '../components/Header'

const LandingPageLayout = () => {
    return (
        <div className='relative'>
            <Header />
            <Outlet />
        </div>
    )
}

export default LandingPageLayout