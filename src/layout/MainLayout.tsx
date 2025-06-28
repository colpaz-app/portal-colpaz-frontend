import { Outlet } from 'react-router-dom'
import '../assets/styles/MainLayout.css';

const MainLayout = () => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>Mi Aplicación</h1>
            </header>

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