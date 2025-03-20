import React, { useState, useEffect, useRef } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/_cardSelection.scss';
import { translations } from '../translations/cardSelection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, showCards, language }) => {
  const t = translations[language];

  const calculateaverange = (users) => {
    const validCards = users
      .map(user => parseFloat(user.selectedCard))
      .filter(card => !isNaN(card));
    const sum = validCards.reduce((acc, card) => acc + card, 0);
    return validCards.length ? (sum / validCards.length).toFixed(2) : 'N/A';
  };

  const getCardColor = (card) => {
    if (card === '?') return 'black';
    if (card >= 0.5 && card <= 3) return 'green';
    if (card === '5') return 'orange';
    if (card >= 8 && card <= 13) return 'red';
    return 'inherit';
  };

  const averangeEstimate = calculateaverange(users);

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span className="username">{user.name}</span>
          <span
            className={`selected-card ${!showCards && user.selectedCard ? 'hidden' : ''}`}
            style={{ color: showCards ? getCardColor(user.selectedCard) : 'inherit' }}
          >
            {showCards || !user.selectedCard ? user.selectedCard : <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />}
          </span>
        </div>
      ))}
      {showCards && (
        <div className="averange-estimate">
          <p>{t.averangeEstimate}</p><span className="averange-value">{averangeEstimate}</span>
        </div>
      )}
    </div>
  );
};

const CardSelection = ({ selectedCard, handleCardSelect, users, sessionId, username, language }) => {
  const [showCards, setShowCards] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);
  const cards = ['?', '0.5', '1', '2', '3', '5', '8', '13'];
  const isResetting = useRef(false);

  const t = translations[language];

  useEffect(() => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (sessionSnap) => {
      if (sessionSnap.exists() && !isResetting.current) {
        setShowCards(sessionSnap.data().showCards);
        setLocalUsers(sessionSnap.data().users);
      }
    });
    return () => unsubscribe();
  }, [sessionId]);

  const handleResetVotes = async () => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const updatedUsers = localUsers.map(user => ({ ...user, selectedCard: null }));
    isResetting.current = true;
    await updateDoc(sessionRef, { users: updatedUsers, showCards: false });
    setLocalUsers(updatedUsers);
    setShowCards(false);
    isResetting.current = false;
  };

  const handleToggleCards = async () => {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, { showCards: !showCards });
  };

  const handleCardSelectLocal = async (card) => {
    const updatedUsers = localUsers.map((user) =>
      user.name === username ? { ...user, selectedCard: card } : user
    );
    await updateDoc(doc(db, 'sessions', sessionId), { users: updatedUsers });
    handleCardSelect(card);
    setLocalUsers(updatedUsers);
  };

  return (
    <div className="card-selection-container">
      <div className="card-selection fade-in">
        <div className="cards">
          {cards.map((card) => (
            <button
              key={card}
              className={`card-option ${localUsers.find(user => user.name === username)?.selectedCard === card ? 'selected' : ''} fade-in`}
              onClick={() => handleCardSelectLocal(card)}
            >
              {card}
            </button>
          ))}
        </div>
        <UserList users={localUsers} showCards={showCards} language={language} />
        <button className="option-button reset fade-in" onClick={handleResetVotes}>{t.resetVotes}</button>
        <button className="option-button fade-in" onClick={handleToggleCards}>
          {showCards ? t.hideCards : t.showCards}
        </button>
      </div>
    </div>
  );
};

export default CardSelection;
