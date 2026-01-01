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
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <a href="/">
            <img src="/logo.svg" alt="Scrum Poker" className="logo-img" />
            Scrum Poker
          </a>
        </div>
      </div>

      <div className="header-right">
        <div className="header-controls">
          <button
            className="control-btn help-toggle"
            onClick={handleHelpClick}
            aria-label="Help"
            title={isEnglish ? 'Help' : 'Pomoc'}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>

          <button
            className="control-btn language-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={isEnglish ? 'Switch to Polish' : 'Przełącz na angielski'}
          >
            <span>{isEnglish ? 'PL' : 'EN'}</span>
          </button>

          <button
            className="control-btn theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
          </button>
        </div>

        {username && (
          <div className="user-info">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
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
