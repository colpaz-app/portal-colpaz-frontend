import { Outlet } from 'react-router-dom'
import '../assets/styles/layouts/AdminLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaNavbar from '../components/MegaNavbar';

const AdminLayout = () => {

    return (
        <>
            <div className="admin-layout">
                <Header />
                <MegaNavbar />
                <Accessibility />
                <main className="admin-layout-main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default AdminLayout;