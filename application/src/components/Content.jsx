import React, { useState } from 'react';
import '../styles/_content.scss';
import CardSelection from './CardSelection';

function Content() {
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [username, setUsername] = useState('');
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isCardSelectionVisible, setIsCardSelectionVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleJoinSession = () => {
    setIsJoining(true);
    setIsCreating(false);
    setErrorMessage('');
  };

  const handleCreateSession = () => {
    setIsCreating(true);
    setIsJoining(false);
    setErrorMessage('');
  };

  const handleCancel = () => {
    setIsJoining(false);
    setIsCreating(false);
  };

  const handleUsernameSubmit = () => {
    if (username.trim().length >= 3) {
      setIsUsernameEntered(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Username must be at least 3 characters long.');
    }
  };

  const handleCreateSessionSubmit = () => {
    if (sessionName.trim().length >= 3) {
      setIsCardSelectionVisible(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Session name must be at least 3 characters long.');
    }
  };

  const handleJoinSessionSubmit = () => {
    if (sessionId.trim().length > 0) {
      setIsCardSelectionVisible(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Session ID cannot be empty.');
    }
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="content">
      {!isCardSelectionVisible ? (
        <div className="card fade-in">
          {!isUsernameEntered ? (
            <>
              <label htmlFor="username" className="username-label">Enter your username</label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <button className="option-button" onClick={handleUsernameSubmit}>Submit</button>
            </>
          ) : (
            <>
              {!isJoining && !isCreating ? (
                <>
                  <button className="option-button fade-in" onClick={handleCreateSession}>Create session</button>
                  <button className="option-button fade-in" onClick={handleJoinSession}>Join session</button>
                </>
              ) : isJoining ? (
                <>
                  <label htmlFor="session-id" className="session-label fade-in">Join session</label>
                  <input
                    type="text"
                    id="session-id"
                    placeholder="session ID"
                    className="session-input fade-in"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                  />
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  <button className="option-button fade-in" onClick={handleJoinSessionSubmit}>Join</button>
                  <button className="option-button fade-in cancel" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <label htmlFor="session-name" className="session-label fade-in">Create session</label>
                  <input
                    type="text"
                    id="session-name"
                    placeholder="session name"
                    className="session-input fade-in"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                  {errorMessage && <div className="error-message">{errorMessage}</div>}
                  <button className="option-button fade-in" onClick={handleCreateSessionSubmit}>Create</button>
                  <button className="option-button fade-in cancel" onClick={handleCancel}>Cancel</button>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <CardSelection
          selectedCard={selectedCard}
          handleCardSelect={handleCardSelect}
        />
      )}
    </div>
  );
}

export default Content;
