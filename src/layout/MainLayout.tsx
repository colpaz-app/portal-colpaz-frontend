import { Outlet } from 'react-router-dom'
import '../assets/styles/MainLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const MainLayout = () => {
    return (
        <div className="layout">
            <Header />
            <Navbar />
            <Accessibility />
            <main className="layout-main">
                <Outlet />
            </main>

            <footer className="layout-footer">
                <p>© 2025 Colpaz</p>
            </footer>
        </div>
    )
}

export default MainLayout