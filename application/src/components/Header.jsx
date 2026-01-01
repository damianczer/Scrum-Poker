import { useState, useContext, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/_header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faMoon, faSun, faQuestionCircle } from '../utils/icons';
import { useTranslation } from '../utils/i18n';
import { ThemeContext } from '../App';
import { THEMES, LANGUAGES } from '../constants/constants';
import Modal from './Modal';
import HelpModal from './HelpModal';

const Header = memo(function Header({ username, language }) {
  const t = useTranslation(language, 'header');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const { theme, toggleTheme, toggleLanguage } = useContext(ThemeContext);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleHelpClick = useCallback(() => {
    setIsHelpModalVisible(true);
  }, []);

  const handleCloseHelpModal = useCallback(() => {
    setIsHelpModalVisible(false);
  }, []);

  const isDarkTheme = theme === THEMES.DARK;
  const isEnglish = language === LANGUAGES.EN;

  return (
    <header className="header" role="banner">
      <div className="header-left">
        <div className="logo">
          <a href="/" aria-label="Scrum Poker - Go to homepage">
            <img src="/assets/icons/logo.svg" alt="" className="logo-img" aria-hidden="true" />
            <span>Scrum Poker</span>
          </a>
        </div>
      </div>

      <div className="header-right">
        <nav className="header-controls" aria-label="Site controls">
          <button
            className="control-btn help-toggle"
            onClick={handleHelpClick}
            aria-label={isEnglish ? 'Open help dialog' : 'Otwórz pomoc'}
            aria-haspopup="dialog"
          >
            <FontAwesomeIcon icon={faQuestionCircle} aria-hidden="true" />
          </button>

          <button
            className="control-btn language-toggle"
            onClick={toggleLanguage}
            aria-label={isEnglish ? 'Switch language to Polish' : 'Zmień język na angielski'}
            aria-live="polite"
          >
            <span aria-hidden="true">{isEnglish ? 'PL' : 'EN'}</span>
          </button>

          <button
            className="control-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-live="polite"
          >
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} aria-hidden="true" />
          </button>
        </nav>

        {username && (
          <div className="user-info" aria-label={`Logged in as ${username}`}>
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" aria-hidden="true" />
            <span className="username">{username}</span>
          </div>
        )}

        {isModalVisible && (
          <Modal
            message={t('sessionIdMessage')}
            onClose={handleCloseModal}
          />
        )}

        {isHelpModalVisible && (
          <HelpModal
            language={language}
            onClose={handleCloseHelpModal}
          />
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

Header.propTypes = {
  username: PropTypes.string,
  language: PropTypes.string.isRequired,
};

export default Header;
