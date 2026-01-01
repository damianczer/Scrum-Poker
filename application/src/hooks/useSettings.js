import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { COOKIE_CONFIG, THEMES, LANGUAGES } from '../constants/constants';
import { logger } from '../utils/logger';

const parseSettingsFromCookie = () => {
    try {
        const settings = Cookies.get(COOKIE_CONFIG.NAME);
        return settings ? JSON.parse(settings) : {};
    } catch {
        return {};
    }
};

export const useSettings = () => {
    const [theme, setTheme] = useState(() => {
        const settings = parseSettingsFromCookie();
        return settings.theme || THEMES.DARK;
    });

    const [language, setLanguage] = useState(() => {
        const settings = parseSettingsFromCookie();
        return settings.language || LANGUAGES.EN;
    });

    const [isThemeChanging, setIsThemeChanging] = useState(false);

    useEffect(() => {
        try {
            const settings = { theme, language };
            Cookies.set(COOKIE_CONFIG.NAME, JSON.stringify(settings), {
                expires: COOKIE_CONFIG.EXPIRES_DAYS
            });
            document.documentElement.setAttribute('data-theme', theme);
        } catch (error) {
            logger.error('Error saving settings:', error);
        }
    }, [theme, language]);

    const toggleTheme = useCallback(() => {
        setIsThemeChanging(true);
        setTimeout(() => {
            setTheme(prev => prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
            setTimeout(() => {
                setIsThemeChanging(false);
            }, 300);
        }, 200);
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === LANGUAGES.EN ? LANGUAGES.PL : LANGUAGES.EN);
    }, []);

    return {
        theme,
        language,
        isThemeChanging,
        toggleTheme,
        toggleLanguage,
        setLanguage,
    };
};

export default useSettings;
