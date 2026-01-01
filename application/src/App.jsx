import './App.scss';
import { createContext, Suspense, lazy, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/common/ErrorBoundary';
import BackgroundIcons from './components/BackgroundIcons';
import { useSettings } from './hooks/useSettings';
import { useTranslation } from './utils/i18n';

const Content = lazy(() => import('./components/Content'));
const Footer = lazy(() => import('./components/Footer'));

export const ThemeContext = createContext();

const LoadingFallback = () => (
  <div className="loading-fallback" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true"></div>
    <p className="loading-text">Loading...</p>
  </div>
);

const ThemeOverlay = ({ language }) => {
  const t = useTranslation(language, 'common');
  return (
    <div className="theme-overlay" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">{t('loading')}</p>
    </div>
  );
};

ThemeOverlay.propTypes = {
  language: PropTypes.string.isRequired,
};

function App() {
  const {
    theme,
    language,
    isThemeChanging,
    toggleTheme,
    toggleLanguage,
    setLanguage,
  } = useSettings();

  const t = useTranslation(language, 'common');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    language,
    setLanguage,
    toggleLanguage,
  }), [theme, toggleTheme, language, setLanguage, toggleLanguage]);

  return (
    <ErrorBoundary
      title={t('somethingWentWrong')}
      message={t('unexpectedError')}
      retryLabel={t('tryAgain')}
      showRetry
    >
      <ThemeContext.Provider value={contextValue}>
        {isThemeChanging && <ThemeOverlay language={language} />}
        <Suspense fallback={<LoadingFallback />}>
          <div className="App" data-theme={theme}>
            <BackgroundIcons />
            <main id="main-content">
              <Content language={language} />
            </main>
            <Footer />
          </div>
        </Suspense>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
