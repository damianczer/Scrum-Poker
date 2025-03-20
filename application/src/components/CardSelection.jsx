import React, { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/_cardSelection.scss';

const UserList = ({ users, showCards, language }) => {
  const translations = {
    en: {
      averangeEstimate: 'Averange Estimate:',
      hidden: 'Hidden'
    },
    pl: {
      averangeEstimate: 'Średnia ocena:',
      hidden: 'Ukryte'
    }
  };

  const t = translations[language];

  const calculateaverange = (users) => {
    const validCards = users
      .map(user => parseFloat(user.selectedCard))
      .filter(card => !isNaN(card));
    const sum = validCards.reduce((acc, card) => acc + card, 0);
    return validCards.length ? (sum / validCards.length).toFixed(2) : 'N/A';
  };

  const averangeEstimate = calculateaverange(users);

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span className="username">{user.name}</span>
          <span className={`selected-card ${!showCards && user.selectedCard ? 'hidden' : ''}`}>
            {showCards || !user.selectedCard ? user.selectedCard : t.hidden}
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

  const translations = {
    en: {
      resetVotes: 'Reset Votes',
      hideCards: 'Hide Cards',
      showCards: 'Show Cards'
    },
    pl: {
      resetVotes: 'Zresetuj głosy',
      hideCards: 'Ukryj karty',
      showCards: 'Pokaż karty'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const unsubscribe = onSnapshot(sessionRef, (sessionSnap) => {
      if (sessionSnap.exists()) {
        setShowCards(sessionSnap.data().showCards);
        setLocalUsers(sessionSnap.data().users);
      }
    });
    return () => unsubscribe();
  }, [sessionId]);

  const handleResetVotes = async () => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const updatedUsers = localUsers.map(user => ({ ...user, selectedCard: null }));
    await updateDoc(sessionRef, { users: updatedUsers, showCards: false });
    handleCardSelect(null);
    setLocalUsers(updatedUsers);
    setShowCards(false);
  };

  const handleToggleCards = async () => {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, { showCards: !showCards });
  };

  const handleCardSelectLocal = async (card) => {
    handleCardSelect(card);
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === username ? { ...user, selectedCard: card } : user
      )
    );
  };

  return (
    <div className="card-selection-container">
      <div className="card-selection fade-in">
        <div className="cards">
          {cards.map((card) => (
            <button
              key={card}
              className={`card-option ${selectedCard === card ? 'selected' : ''} fade-in`}
              onClick={() => handleCardSelectLocal(card)}
            >
              {card}
            </button>
          ))}
        </div>
        <UserList users={localUsers} showCards={showCards} language={language} />
        <button className="option-button reset fade-in" onClick={() => handleResetVotes(username)}>{t.resetVotes}</button>
        <button className="option-button fade-in" onClick={handleToggleCards}>
          {showCards ? t.hideCards : t.showCards}
        </button>
      </div>
    </div>
  );
};

export default CardSelection;
