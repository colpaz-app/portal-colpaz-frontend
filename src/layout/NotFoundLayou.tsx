import { Outlet } from 'react-router-dom'
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaNavbar from '../components/MegaNavbar';

const NotFoundLayout = () => {
    return (
        <div className="not-found-layout">
            <Header />
            <MegaNavbar />
            <Accessibility />
            <main className="not-found-layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default NotFoundLayout;