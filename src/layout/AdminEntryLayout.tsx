import { Outlet } from 'react-router-dom'
import '../assets/styles/layouts/AdminEntryLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaNavbar from '../components/MegaNavbar';

const AdminEntryLayout = () => {
    return (
        <div className="admin-entry-layout">
            <Header />
            <MegaNavbar />
            <Accessibility />
            <main className="admin-entry-layout-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AdminEntryLayout;