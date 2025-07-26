import { useEffect, useRef, useCallback } from 'react';

const TOKEN_REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutos
const WARNING_BEFORE_REFRESH = 5 * 60 * 1000; // 5 minuto antes

export function useTokenRefresher(showWarning: () => void) {
    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scheduleNextRefresh = useCallback(() => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
        if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);

        warningTimeoutRef.current = setTimeout(() => {
            const sessionEnded = sessionStorage.getItem('sessionEnded');
            if (!sessionEnded || sessionEnded === 'false') {
                showWarning();
            }
        }, TOKEN_REFRESH_INTERVAL - WARNING_BEFORE_REFRESH);

        intervalRef.current = setTimeout(() => {
            scheduleNextRefresh();
        }, TOKEN_REFRESH_INTERVAL);
    }, [showWarning]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            scheduleNextRefresh();
        }

        return () => {
            if (intervalRef.current) clearTimeout(intervalRef.current);
            if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
        };
    }, [scheduleNextRefresh]);

    return {
        resetRefreshCycle: scheduleNextRefresh
    };
}