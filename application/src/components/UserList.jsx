import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { translations } from '../translations/cardSelection';
import '../styles/_userList.scss';

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

export default UserList;
