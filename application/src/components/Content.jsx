import React, { useState, useEffect } from 'react';
import '../styles/_content.scss';
import CardSelection from './CardSelection';
import Header from './Header';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
  const [users, setUsers] = useState([]);
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  useEffect(() => {
    if (sessionId) {
      const sessionRef = doc(db, 'sessions', sessionId);
      const unsubscribe = onSnapshot(sessionRef, (sessionSnap) => {
        if (sessionSnap.exists()) {
          setUsers(sessionSnap.data().users);
        }
      });
      return () => unsubscribe();
    }
  }, [sessionId]);

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
    setIsUsernameEntered(true);
    setErrorMessage('');
  }

  const handleCancelGame = () => {
    setIsJoining(false);
    setIsCreating(false);
    setIsUsernameEntered(false);
    setErrorMessage('');
  };

  const handleUsernameSubmit = () => {
    if (username.trim().length < 2) {
      setErrorMessage('Username must be at least 2 characters long.');
    } else if (username.trim().length > 25) {
      setErrorMessage('Username cannot be longer than 25 characters.');
    } else {
      setIsUsernameEntered(true);
      setErrorMessage('');
    }
  };

  const handleCreateSessionSubmit = async () => {
    if (sessionName.trim().length >= 3) {
      try {
        const docRef = await addDoc(collection(db, 'sessions'), {
          sessionName,
          users: [{ name: username, selectedCard: null }],
          showCards: false
        });
        setSessionId(docRef.id);
        setIsCardSelectionVisible(true);
        setErrorMessage('');
        const sessionSnap = await getDoc(docRef);
        setUsers(sessionSnap.data().users);
        setIsSessionCreated(true);
        const sessionRef = doc(db, 'sessions', docRef.id);
        const unsubscribe = onSnapshot(sessionRef, (sessionSnap) => {
          if (sessionSnap.exists()) {
            setUsers(sessionSnap.data().users);
          }
        });
        return () => unsubscribe();
      } catch (e) {
        setErrorMessage('Error creating session: ' + e.message);
      }
    } else {
      setErrorMessage('Session name must be at least 3 characters long.');
    }
  };

  const handleJoinSessionSubmit = async () => {
    if (sessionId.trim().length > 0) {
      try {
        const sessionRef = doc(db, 'sessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);
        if (sessionSnap.exists()) {
          const users = sessionSnap.data().users;
          if (users.length >= 10) {
            setErrorMessage('Session is full. Maximum 10 users allowed.');
            return;
          }
          const updatedUsers = [...users, { name: username, selectedCard: null }];
          await updateDoc(sessionRef, {
            users: updatedUsers,
            showCards: false
          });
          setIsCardSelectionVisible(true);
          setErrorMessage('');
          setUsers(updatedUsers);
          setIsSessionCreated(true);
          const unsubscribe = onSnapshot(sessionRef, (sessionSnap) => {
            if (sessionSnap.exists()) {
              setUsers(sessionSnap.data().users);
            }
          });
          return () => unsubscribe();
        } else {
          setErrorMessage('Session ID does not exist.');
        }
      } catch (e) {
        setErrorMessage('Error joining session: ' + e.message);
      }
    } else {
      setErrorMessage('Session ID cannot be empty.');
    }
  };

  const handleCardSelect = async (card) => {
    setSelectedCard(card);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === username ? { ...user, selectedCard: card } : user
      )
    );
    const sessionRef = doc(db, 'sessions', sessionId);
    const updatedUsers = users.map((user) =>
      user.name === username ? { ...user, selectedCard: card } : user
    );
    await updateDoc(sessionRef, {
      users: updatedUsers
    });
  };

  const handleShareSession = () => {
    navigator.clipboard.writeText(sessionId);
    alert('Session ID copied to clipboard!');
  };

  return (
    <div className="content">
      <Header username={isUsernameEntered ? username : ''} onShare={isSessionCreated ? handleShareSession : null} />
      {!isCardSelectionVisible ? (
        <div className="card fade-in">
          {!isUsernameEntered ? (
            <>
              <FontAwesomeIcon icon={faUserCircle} className="user-icon fade-in" style={{ fontSize: '3em', marginBottom: '10px', color: '#b3b3b3' }} />
              <label htmlFor="username" className="username-label fade-in">Enter your username</label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="username-input fade-in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
              <button className="option-button fade-in" onClick={handleUsernameSubmit}>Submit</button>
            </>
          ) : (
            <>
              {!isJoining && !isCreating ? (
                <>
                  <button className="option-button fade-in" onClick={handleCreateSession}>Create session</button>
                  <button className="option-button fade-in" onClick={handleJoinSession}>Join session</button>
                  <button className="option-button fade-in cancel" onClick={handleCancelGame}>Cancel</button>
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
                  {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
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
                  {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
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
          users={users}
          setUsers={setUsers}
          sessionId={sessionId}
          username={username}
        />
      )}
    </div>
  );
}

export default Content;
