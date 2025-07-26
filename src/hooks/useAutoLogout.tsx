import { useEffect, useRef, useCallback } from 'react';

const INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutos
const WARNING_TIME = INACTIVITY_TIME - 60 * 1000; // 1 minuto

export const useAutoLogout = (
    showWarning: () => void,
    hideWarning: () => void
): { resetTimers: () => void } => {
    const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const logoutExecuted = useRef<boolean>(false);

    const logout = useCallback(() => {
        if (logoutExecuted.current) {
            return;
        }

        logoutExecuted.current = true;

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        sessionStorage.setItem('sessionEnded', 'true');
        hideWarning();
        window.location.href = '/?logout=1';
    }, [hideWarning]);

    const resetTimers = useCallback(() => {
        logoutExecuted.current = false;

        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        if (warningTimer.current) clearTimeout(warningTimer.current);

        const token = localStorage.getItem('token');
        if (!token) return;

        warningTimer.current = setTimeout(() => {
            const ended = sessionStorage.getItem('sessionEnded');
            if (!ended || ended === 'false') {
                showWarning();
            }
        }, WARNING_TIME);
    }, [showWarning]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const ended = sessionStorage.getItem('sessionEnded');

        if (!token && ended !== 'shown') {
            logout();
            return;
        }

        const localLogoutTimer = logoutTimer.current;
        const localWarningTimer = warningTimer.current;

        // Eventos de actividad del usuario
        const events = [
            'mousemove', 'mousedown', 'mouseup', 'click', 'dblclick',
            'contextmenu', 'wheel', 'mouseenter', 'mouseleave',
            'keydown', 'keyup', 'keypress',
            'touchstart', 'touchmove', 'touchend', 'touchcancel',
            'scroll', 'resize',
            'focus', 'blur', 'focusin', 'focusout',
            'input', 'change', 'submit',
            'dragstart', 'drag', 'dragend',
            'selectstart', 'selectionchange'
        ];

        const handleActivity = () => {
            resetTimers();
        };

        events.forEach(event => {
            document.addEventListener(event, handleActivity, {
                passive: true,
                capture: false
            });
        });

        resetTimers();

        return () => {
            if (localLogoutTimer) clearTimeout(localLogoutTimer);
            if (localWarningTimer) clearTimeout(localWarningTimer);
            events.forEach(event => document.removeEventListener(event, handleActivity));
        };
    }, [resetTimers, logout]);

    return { resetTimers };
};