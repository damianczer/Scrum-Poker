import React, { useState, useEffect, Suspense, lazy } from 'react';
import '../styles/_content.scss';
import Header from './Header';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCookieBite, faHourglassHalf, faPlusCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { translations } from '../translations/content';

const CardSelection = lazy(() => import('./CardSelection'));

function Content({ language }) {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[language];

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

  useEffect(() => {
    if (isSubmitted) {
      if (username.trim().length < 2) {
        setErrorMessage(t.usernameErrorShort);
      } else if (username.trim().length > 25) {
        setErrorMessage(t.usernameErrorLong);
      } else {
        setErrorMessage('');
      }
    }
  }, [username, language, isSubmitted, t.usernameErrorLong, t.usernameErrorShort]);

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
    setIsSubmitted(true);
    if (username.trim().length < 2) {
      setErrorMessage(t.usernameErrorShort);
    } else if (username.trim().length > 25) {
      setErrorMessage(t.usernameErrorLong);
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
        setErrorMessage(t.errorCreatingSession + e.message);
      }
    } else {
      setErrorMessage(t.sessionNameError);
    }
  };

  const handleJoinSessionSubmit = async () => {
    if (sessionId.trim().length > 0) {
      try {
        const sessionRef = doc(db, 'sessions', sessionId);
        const sessionSnap = await getDoc(sessionRef);
        if (sessionSnap.exists()) {
          const users = sessionSnap.data().users;
          if (users.length >= 8) {
            setErrorMessage(t.sessionFull);
            return;
          }
          if (users.some(user => user.name === username)) {
            setErrorMessage(t.usernameExists);
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
          setErrorMessage(t.sessionIdNotExist);
        }
      } catch (e) {
        setErrorMessage(t.errorJoiningSession + e.message);
      }
    } else {
      setErrorMessage(t.sessionIdError);
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
    alert(t.sessionIdCopied);
  };

  return (
    <div className="content">
      <Header username={isUsernameEntered ? username : ''} onShare={isSessionCreated ? handleShareSession : null} language={language} />
      {!isCardSelectionVisible ? (
        <div className="card fade-in">
          {!isUsernameEntered ? (
            <>
              <FontAwesomeIcon icon={faUserCircle} className="input-icon fade-in" />
              <label htmlFor="username" className="username-label fade-in">{t.enterUsername}</label>
              <input
                type="text"
                id="username"
                placeholder={t.usernamePlaceholder}
                className="username-input fade-in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
              <button className="option-button fade-in" onClick={handleUsernameSubmit}>{t.submit}</button>
              <div className="cookies-consent fade-in">
                <FontAwesomeIcon icon={faCookieBite} className="cookie-icon" />
                <span className="cookie-text">{t.cookiesConsent}</span>
              </div>
            </>
          ) : (
            <>
              {!isJoining && !isCreating ? (
                <>
                  <FontAwesomeIcon icon={faHourglassHalf} className="input-icon fade-in" />
                  <p className="choose-option fade-in">{t.chooseOption}</p>
                  <button className="option-button fade-in" onClick={handleCreateSession}>{t.createSession}</button>
                  <button className="option-button fade-in" onClick={handleJoinSession}>{t.joinSession}</button>
                  <button className="option-button fade-in cancel" onClick={handleCancelGame}>{t.cancel}</button>
                </>
              ) : isJoining ? (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} className="input-icon fade-in" />
                  <label htmlFor="session-id" className="session-label fade-in">{t.joinSessionLabel}</label>
                  <input
                    type="text"
                    id="session-id"
                    placeholder={t.sessionIdPlaceholder}
                    className="session-input fade-in"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                  />
                  {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
                  <button className="option-button fade-in" onClick={handleJoinSessionSubmit}>{t.joinSession}</button>
                  <button className="option-button fade-in cancel" onClick={handleCancel}>{t.cancel}</button>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlusCircle} className="input-icon fade-in" />
                  <label htmlFor="session-name" className="session-label fade-in">{t.createSessionLabel}</label>
                  <input
                    type="text"
                    id="session-name"
                    placeholder={t.sessionNamePlaceholder}
                    className="session-input fade-in"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                  {errorMessage && <div className="error-message fade-in">{errorMessage}</div>}
                  <button className="option-button fade-in" onClick={handleCreateSessionSubmit}>{t.createSession}</button>
                  <button className="option-button fade-in cancel" onClick={handleCancel}>{t.cancel}</button>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <CardSelection
            selectedCard={selectedCard}
            handleCardSelect={handleCardSelect}
            users={users}
            setUsers={setUsers}
            sessionId={sessionId}
            username={username}
            language={language}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Content;
