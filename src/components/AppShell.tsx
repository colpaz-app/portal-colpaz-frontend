import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useAutoLogout } from '../hooks/useAutoLogout';
import Modal from '../components/Modal';
import Button from '../components/Button';

const AppShell = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [hasProcessedLogout, setHasProcessedLogout] = useState(false);

    const showWarning = useCallback(() => {
        const ended = sessionStorage.getItem('sessionEnded');
        if (!ended || ended === 'false') {
            setShowWarningModal(true);
        }
    }, []);

    const hideWarning = useCallback(() => {
        setShowWarningModal(false);
    }, []);

    const { resetTimers } = useAutoLogout(showWarning, hideWarning);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const logoutParam = params.get('logout');
        const sessionEnded = sessionStorage.getItem('sessionEnded');

        if (logoutParam === '1') {
            if (!hasProcessedLogout && sessionEnded === 'true') {
                sessionStorage.setItem('sessionEnded', 'shown');
                setHasProcessedLogout(true);
            }

            navigate(location.pathname, { replace: true });
        }
    }, [location, hasProcessedLogout, navigate]);

    return (
        <>
            <Modal
                show={showWarningModal}
                type="warning"
                title={t('session.warningTitle')}
                message={t('session.warningMessage')}
                footer={
                    <Button variant="primary" onClick={() => {
                            hideWarning();
                            resetTimers();
                        }}>
                        {t('common.ok')}
                    </Button>
                }
                onClose={() => {
                    hideWarning();
                    resetTimers();
                }}
            />

            <Outlet />
        </>
    );
};

export default AppShell;