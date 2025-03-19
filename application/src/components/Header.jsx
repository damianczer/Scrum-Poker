import React from 'react';
import '../styles/_header.scss';

const Header = ({ username, onShare }) => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">Scrum Poker</a>
      </div>
      {username && (
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="userid">{username}</span>
        </div>
      )}
      {onShare && (
        <button className="share-button" onClick={onShare}>
          <span className="share-icon">🔗</span> Share Session
        </button>
      )}
    </header>
  );
};

export default Header;
