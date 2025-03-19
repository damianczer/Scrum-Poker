import React from 'react';
import '../styles/_header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Header = ({ username, onShare }) => {
  return (
    <header className="header">
      <div className="logo" style={{ textAlign: 'center' }}>
        <a href="/">Scrum Poker</a>
      </div>
      {username && (
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" style={{ fontSize: '1em' }} />
          <span className="userid">{username}</span>
        </div>
      )}
      {onShare && (
        <div className="share">
          <button className="share-button" onClick={onShare}>
            Share Session
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
