import { Outlet } from 'react-router-dom'
import '../assets/styles/layouts/AdminLayout.css';
import Accessibility from '../components/Accessibility';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MegaNavbar from '../components/MegaNavbar';
import { useAutoLogout } from '../hooks/useAutoLogout';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';

const AdminLayout = () => {
    const { t } = useTranslation();
    const [showWarningModal, setShowWarningModal] = useState(false);

    const showWarning = useCallback(() => setShowWarningModal(true), []);
    const hideWarning = useCallback(() => setShowWarningModal(false), []);

    useAutoLogout(showWarning, hideWarning);

    return (
        <>
            <Modal
                show={showWarningModal}
                type="warning"
                title={t('session.warningTitle')}
                message={t('session.warningMessage')}
                footer={
                    <Button variant="primary" onClick={() => setShowWarningModal(false)}>
                        {t('common.ok')}
                    </Button>
                }
                onClose={() => setShowWarningModal(false)}
            />
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