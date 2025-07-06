import { Outlet } from 'react-router-dom'
import '../assets/styles/layouts/MainLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaNavbar from '../components/MegaNavbar';

const MainLayout = () => {
    return (
        <div className="layout">
            <Header />
            <MegaNavbar />
            <Accessibility />
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout