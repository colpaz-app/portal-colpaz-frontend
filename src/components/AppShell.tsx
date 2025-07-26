import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useAutoLogout } from '../hooks/useAutoLogout';
import { useTokenRefresher } from '../hooks/useTokenRefresher';
import { useRefreshToken } from '../hooks/useRefreshToken';
import Modal from '../components/Modal';
import Button from '../components/Button';

type WarningType = 'inactivity' | 'token-refresh';

const MODAL_TIMEOUT = 60 * 1000; // 1 minuto para responder

const AppShell = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningType, setWarningType] = useState<WarningType>('inactivity');
    const [hasProcessedLogout, setHasProcessedLogout] = useState(false);
    const [isProcessingRefresh, setIsProcessingRefresh] = useState(false);
    const [modalCountdown, setModalCountdown] = useState(60);

    const modalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const { refresh } = useRefreshToken();

    // Función para forzar logout
    const forceLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        sessionStorage.setItem('sessionEnded', 'true');
        window.location.href = '/?logout=1';
    }, []);

    // Función para limpiar timers del modal
    const clearModalTimers = useCallback(() => {
        if (modalTimeoutRef.current) {
            clearTimeout(modalTimeoutRef.current);
            modalTimeoutRef.current = null;
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
    }, []);

    // Función para iniciar countdown del modal
    const startModalCountdown = useCallback(() => {
        setModalCountdown(60);

        countdownIntervalRef.current = setInterval(() => {
            setModalCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownIntervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        modalTimeoutRef.current = setTimeout(() => {
            forceLogout();
        }, MODAL_TIMEOUT);
    }, [forceLogout]);

    // Callback para mostrar advertencia de inactividad
    const showInactivityWarning = useCallback(() => {
        const ended = sessionStorage.getItem('sessionEnded');
        if (!ended || ended === 'false') {
            if (!showWarningModal) {
                setWarningType('inactivity');
                setShowWarningModal(true);
                startModalCountdown();
            }
        }
    }, [startModalCountdown, showWarningModal]);

    const showTokenRefreshWarning = useCallback(() => {
        const ended = sessionStorage.getItem('sessionEnded');
        if (!ended || ended === 'false') {
            if (showWarningModal && warningType === 'inactivity') {
                clearModalTimers();
            }
            setWarningType('token-refresh');
            setShowWarningModal(true);
            startModalCountdown();
        }
    }, [startModalCountdown, showWarningModal, warningType, clearModalTimers]);

    const hideWarning = useCallback(() => {
        clearModalTimers();
        setShowWarningModal(false);
        setIsProcessingRefresh(false);
        setModalCountdown(60);
    }, [clearModalTimers]);

    const { resetTimers } = useAutoLogout(showInactivityWarning, hideWarning);
    const { resetRefreshCycle } = useTokenRefresher(showTokenRefreshWarning);

    const handleModalAction = useCallback(async () => {
        if (warningType === 'inactivity') {
            hideWarning();
            resetTimers();
        } else if (warningType === 'token-refresh') {
            setIsProcessingRefresh(true);

            try {
                const newToken = await refresh();

                if (newToken) {
                    hideWarning();
                    resetTimers();
                    resetRefreshCycle();
                } else {
                    forceLogout();
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
                forceLogout();
            }
        }
    }, [warningType, hideWarning, resetTimers, resetRefreshCycle, refresh, forceLogout]);

    // Obtener textos del modal según el tipo
    const getModalContent = () => {
        if (warningType === 'inactivity') {
            return {
                title: t('session.inactivityWarningTitle'),
                message: t('session.inactivityWarningMessage', { count: modalCountdown }),
                buttonText: t('common.continue')
            };
        } else {
            return {
                title: t('session.tokenWarningTitle'),
                message: t('session.tokenWarningMessage', { count: modalCountdown }),
                buttonText: isProcessingRefresh
                    ? t('common.refreshing')
                    : t('common.maintain')
            };
        }
    };

    const modalContent = getModalContent();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const logoutParam = params.get('logout');
        const sessionEnded = sessionStorage.getItem('sessionEnded');

        if (logoutParam === '1') {
            sessionStorage.removeItem('loggingOut');

            if (!hasProcessedLogout && sessionEnded === 'true') {
                sessionStorage.setItem('sessionEnded', 'shown');
                setHasProcessedLogout(true);
            }

            navigate(location.pathname, { replace: true });
        }
    }, [location, hasProcessedLogout, navigate]);

    // Cleanup de timers al desmontar el componente
    useEffect(() => {
        return () => {
            clearModalTimers();
        };
    }, [clearModalTimers]);

    return (
        <>
            <Modal
                show={showWarningModal}
                type="warning"
                title={modalContent.title}
                message={modalContent.message}
                footer={
                    <Button
                        variant="primary"
                        onClick={handleModalAction}
                        disabled={isProcessingRefresh}
                    >
                        {modalContent.buttonText}
                    </Button>
                }
                onClose={() => {
                    if (!isProcessingRefresh) {
                        setShowWarningModal(false);
                        setIsProcessingRefresh(false);
                    }
                }}
            />
            <Outlet />
        </>
    );
};

export default AppShell;