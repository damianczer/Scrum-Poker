import { useState, useEffect } from 'react';

export const useUrlSession = () => {
    const [urlSessionId, setUrlSessionId] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionParam = urlParams.get('session');
        if (sessionParam) {
            setUrlSessionId(sessionParam);
        }
    }, []);

    const clearUrlSession = () => {
        setUrlSessionId(null);
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    return {
        urlSessionId,
        setUrlSessionId,
        clearUrlSession,
        hasUrlSession: Boolean(urlSessionId),
    };
};

export default useUrlSession;
