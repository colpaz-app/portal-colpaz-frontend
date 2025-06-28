import { Outlet } from 'react-router-dom'
import '../assets/styles/MainLayout.css';
import Accessibility from '../components/Accessibility/Accessibility';

const MainLayout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>Mi Aplicación</h1>
            </header>
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