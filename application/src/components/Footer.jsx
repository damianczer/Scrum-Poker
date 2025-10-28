import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Cookies from 'js-cookie';
import '../styles/_footer.scss';
import { translations } from '../translations/footer';

const Footer = ({ setLanguage }) => {
  const currentYear = new Date().getFullYear();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(() => {
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    return settings.color || 'blue';
  });
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    return settings.language || 'en';
  });
  const settingsRef = useRef(null);

  const t = translations[selectedLanguage];

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setIsSettingsOpen(false);
    }
  };

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    settings.color = color;
    Cookies.set('dc_scrum_poker_settings', JSON.stringify(settings), { expires: 365 });
    document.documentElement.setAttribute('data-theme', color);
  };

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    setLanguage(language);
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    settings.language = language;
    Cookies.set('dc_scrum_poker_settings', JSON.stringify(settings), { expires: 365 });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedColor);
    const settings = JSON.parse(Cookies.get('dc_scrum_poker_settings') || '{}');
    if (!settings.color || !settings.language) {
      settings.color = selectedColor;
      settings.language = selectedLanguage;
      Cookies.set('dc_scrum_poker_settings', JSON.stringify(settings), { expires: 365 });
    }
  }, [selectedColor, selectedLanguage]);

  useEffect(() => {
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/daczerw/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
        </a>
        <a href="https://github.com/damianczer" target="_blank" rel="noopener noreferrer" title="GitHub">
          <FontAwesomeIcon icon={faGithub} className="github-icon" />
        </a>
      </div>
      <p>{t.copyright} &copy; {currentYear} Damian Czerwiński - {t.copyrightend}</p>
      <div className="settings" ref={settingsRef}>
        <FontAwesomeIcon icon={faCog} className="settings-icon" onClick={toggleSettings} />
        {isSettingsOpen && (
          <div className="settings-menu">
            <div>
              <label htmlFor="language-select">{t.language}</label>
              <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">{t.english}</option>
                <option value="pl">{t.polish}</option>
              </select>
            </div>
            <div>
              <label htmlFor="color-select">{t.color}</label>
              <select id="color-select" value={selectedColor} onChange={handleColorChange}>
                <option value="green">{t.green}</option>
                <option value="blue">{t.blue}</option>
                <option value="turquoise">{t.turquoise}</option>
                <option value="grey">{t.grey}</option>
                <option value="orange">{t.orange}</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
