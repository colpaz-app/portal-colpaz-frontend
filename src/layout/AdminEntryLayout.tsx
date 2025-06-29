import { Outlet } from 'react-router-dom';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import MegaNavbar from '../components/MegaNavbar';
import Footer from '../components/Footer';

const AdminEntryLayout = () => {
    return (
        <div className="admin-layout">
            <Header />
            <MegaNavbar />
            <Accessibility />
            <main className="admin-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AdminEntryLayout;