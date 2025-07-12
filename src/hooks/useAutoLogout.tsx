import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const INACTIVITY_TIME = 5 * 60 * 1000;
const WARNING_TIME = INACTIVITY_TIME - 60 * 1000;

export const useAutoLogout = (
    showWarning: () => void,
    hideWarning: () => void
) => {
    const navigate = useNavigate();
    const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const logout = () => {
            localStorage.removeItem('token');
            navigate('/?logout=1');
        };

        const resetTimers = () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
            if (warningTimer.current) clearTimeout(warningTimer.current);

            // hideWarning(); ← ELIMINADO

            warningTimer.current = setTimeout(() => {
                showWarning();
            }, WARNING_TIME);

            logoutTimer.current = setTimeout(() => {
                logout();
            }, INACTIVITY_TIME);
        };

        const token = localStorage.getItem('token');
        if (!token) {
            logout();
            return;
        }

        const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
        events.forEach((event) => document.addEventListener(event, resetTimers));

        resetTimers();

        return () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
            if (warningTimer.current) clearTimeout(warningTimer.current);
            events.forEach((event) => document.removeEventListener(event, resetTimers));
        };
    }, [navigate, showWarning, hideWarning]);
};