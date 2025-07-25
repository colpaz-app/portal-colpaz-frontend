import { useState, useCallback } from 'react';
import { ENV } from '../config/env';

interface HttpOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    headers?: HeadersInit;
    token?: string;
}

interface HttpResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    sendRequest: () => Promise<T | null>;
}

export function useHttp<T = unknown>(
    endpoint: string,
    options: HttpOptions = {}
): HttpResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(async (): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${ENV.apiUrl}${endpoint}`, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.token
                        ? { Authorization: `Bearer ${options.token}` }
                        : {}),
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            const contentType = res.headers.get('content-type');
            const isJson = contentType?.includes('application/json');

            const result = isJson ? await res.json() : null;

            if (!res.ok) {
                const errorMessage = result?.message || result?.error || res.statusText;
                throw new Error(`(${res.status}) ${errorMessage}`);
            }

            setData(result);
            return result;
        } catch (err: unknown) {
            if (err instanceof TypeError && err.message.includes('NetworkError')) {
                setError('NETWORK_ERROR');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error');
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, [endpoint, options.method, options.body, options.headers, options.token]);

    return { data, loading, error, sendRequest };
}