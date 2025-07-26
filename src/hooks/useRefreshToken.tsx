import { useHttp } from './useHttp';

export function useRefreshToken() {
    const { sendRequest, loading, error, data } = useHttp<{ token: string }>('/auth/refresh-token', {
        method: 'POST',
        body: {
            refreshToken: localStorage.getItem('refreshToken'),
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const refresh = async (): Promise<string | null> => {
        try {
            const result = await sendRequest();

            if (result?.token) {
                localStorage.setItem('token', result.token);
                return result.token;
            } else {
                console.warn('Refresh failed:', error);
                return null;
            }
        } catch (err) {
            console.error('Token refresh error:', err);
            return null;
        }
    };

    return { refresh, loading, error, data };
}