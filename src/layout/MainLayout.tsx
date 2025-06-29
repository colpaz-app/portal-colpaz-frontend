import { Outlet } from 'react-router-dom'
import '../assets/styles/MainLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="layout">
            <Header />
            <Navbar />
            <Accessibility />
            <main className="layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout