import './App.scss';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import Content from './components/Content';
import Footer from './components/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useSettings } from './hooks/useSettings';
import { useTranslation } from './utils/i18n';

export const ThemeContext = createContext();

const ThemeOverlay = ({ language }) => {
  const t = useTranslation(language, 'common');
  return (
    <div className="theme-overlay">
      <div className="spinner"></div>
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

  const contextValue = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    toggleLanguage,
  };

  return (
    <ErrorBoundary
      title={t('somethingWentWrong')}
      message={t('unexpectedError')}
      retryLabel={t('tryAgain')}
      showRetry
    >
      <ThemeContext.Provider value={contextValue}>
        {isThemeChanging && <ThemeOverlay language={language} />}
        <div className="App" data-theme={theme}>
          <Content language={language} />
          <Footer />
        </div>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
