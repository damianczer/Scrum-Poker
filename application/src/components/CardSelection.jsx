import React, { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/_cardSelection.scss';

const UserList = ({ users, showCards }) => {
  const calculateAverage = (users) => {
    const validCards = users
      .map(user => parseFloat(user.selectedCard))
      .filter(card => !isNaN(card));
    const sum = validCards.reduce((acc, card) => acc + card, 0);
    return validCards.length ? (sum / validCards.length).toFixed(2) : 'N/A';
  };

  const averageEstimate = calculateAverage(users);

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span className="username">{user.name}</span>
          <span className={`selected-card ${!showCards && user.selectedCard ? 'hidden' : ''}`}>
            {showCards || !user.selectedCard ? user.selectedCard : 'Hidden'}
          </span>
        </div>
      ))}
      {showCards && (
        <div className="average-estimate">
          <span>Average Estimate: {averageEstimate}</span>
        </div>
      )}
    </div>
  );
};

const CardSelection = ({ selectedCard, handleCardSelect, users, sessionId, username }) => {
  const [showCards, setShowCards] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);
  const cards = ['?', '0.5', '1', '2', '3', '5', '8', '13'];

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
    await updateDoc(sessionRef, { users: updatedUsers });
    handleCardSelect(null);
    setLocalUsers(updatedUsers);
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
      <div className="card-selection">
        <div className="cards">
          {cards.map((card) => (
            <button
              key={card}
              className={`card-option ${selectedCard === card ? 'selected' : ''}`}
              onClick={() => handleCardSelectLocal(card)}
            >
              {card}
            </button>
          ))}
        </div>
        <UserList users={localUsers} showCards={showCards} />
        <button className="option-button reset" onClick={() => handleResetVotes(username)}>Reset Votes</button>
        <button className="option-button" onClick={handleToggleCards}>
          {showCards ? 'Hide Cards' : 'Show Cards'}
        </button>
      </div>
    </div>
  );
};

export default CardSelection;
