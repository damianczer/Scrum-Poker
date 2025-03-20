import React from 'react';
import '../styles/_header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { translations } from '../translations/header';

const Header = ({ username, onShare, language }) => {
  const t = translations[language];

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Scrum Poker</a>
      </div>
      {username && (
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <span className="userid">{username}</span>
        </div>
      )}
      {onShare && (
        <div className="share">
          <button className="share-button" onClick={onShare}>
            {t.shareSession}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
