import { useEffect, useRef, useCallback } from 'react';

const INACTIVITY_TIME = 3 * 60 * 1000; // 3 minutos
const WARNING_TIME = INACTIVITY_TIME - 60 * 1000; // 2 minutos

export const useAutoLogout = (
    showWarning: () => void,
    hideWarning: () => void
): { resetTimers: () => void } => {
    const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.setItem('sessionEnded', 'true');
        hideWarning();
        window.location.href = '/?logout=1';
    }, [hideWarning]);

    const resetTimers = useCallback(() => {
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

        logoutTimer.current = setTimeout(() => {
            logout();
        }, INACTIVITY_TIME);
    }, [showWarning, logout]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const ended = sessionStorage.getItem('sessionEnded');

        if (!token && ended !== 'shown') {
            logout();
            return;
        }

        const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress', 'keydown'];
        events.forEach(event => document.addEventListener(event, resetTimers));
        resetTimers();

        return () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
            if (warningTimer.current) clearTimeout(warningTimer.current);
            events.forEach(event => document.removeEventListener(event, resetTimers));
        };
    }, [resetTimers, logout]);

    return { resetTimers };
};