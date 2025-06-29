import { Outlet } from 'react-router-dom';
import Accessibility from '../components/Accessibility';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <Accessibility />
            <main className="auth-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;