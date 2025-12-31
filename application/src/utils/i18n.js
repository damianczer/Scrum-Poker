import { useMemo, useCallback } from 'react';
import enTranslations from '../translations/en.json';
import plTranslations from '../translations/pl.json';

const translations = {
    en: enTranslations,
    pl: plTranslations
};

export const t = (language, keyPath, variables = {}) => {
    const keys = keyPath.split('.');
    let translation = translations[language] || translations.en;

    for (const key of keys) {
        translation = translation?.[key];
    }

    if (!translation) {
        console.warn(`Translation not found for key: ${keyPath} in language: ${language}`);
        return keyPath;
    }

    if (typeof translation === 'string' && Object.keys(variables).length > 0) {
        return translation.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match);
    }

    return translation;
};

export const useTranslation = (language, namespace) => {
    const translate = useCallback(
        (key, variables) => t(language, `${namespace}.${key}`, variables),
        [language, namespace]
    );

    return translate;
};

export const useNamespaceTranslations = (language, namespace) => {
    return useMemo(() => {
        const lang = translations[language] || translations.en;
        return lang[namespace] || {};
    }, [language, namespace]);
};

export const getNamespaceTranslations = (language, namespace) => {
    const lang = translations[language] || translations.en;
    return lang[namespace] || {};
};

export default translations;
