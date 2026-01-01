import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '../utils/icons';
import { useTranslation } from '../utils/i18n';
import { getCardColor, calculateAverage } from '../utils/cardUtils';
import { getAssetPath } from '../constants/config';
import '../styles/_userList.scss';

const UserList = memo(function UserList({ users, showCards, language }) {
  const t = useTranslation(language, 'content');
  const tCard = useTranslation(language, 'cardSelection');

  const averageEstimate = useMemo(() =>
    calculateAverage(users),
    [users]
  );

  return (
    <div 
      className={`user-list ${users.length > 5 ? 'two-columns' : ''}`}
      role="list"
      aria-label={tCard('userListLabel')}
    >
      {users.map((user) => (
        <div 
          key={user.name} 
          className="user"
          role="listitem"
          aria-label={`${user.name}${showCards && user.selectedCard ? `, voted ${user.selectedCard === '?' ? 'coffee break' : user.selectedCard}` : user.selectedCard ? ', has voted' : ', has not voted'}`}
        >
          <span className="username">{user.name}</span>
          <span
            className={`selected-card ${!showCards && user.selectedCard ? 'hidden' : ''}`}
            style={{ color: showCards ? getCardColor(user.selectedCard) : 'inherit' }}
            aria-hidden={!showCards}
          >
            {showCards || !user.selectedCard ? (
              user.selectedCard === '?' ? (
                <img src={getAssetPath('/assets/icons/coffee.svg')} alt="Coffee break" className="card-coffee-icon" />
              ) : (
                user.selectedCard || <span className="sr-only">No vote</span>
              )
            ) : (
              <>
                <FontAwesomeIcon icon={faCheckCircle} className="check-icon" aria-hidden="true" />
                <span className="sr-only">Has voted</span>
              </>
            )}
          </span>
        </div>
      ))}

      {showCards && (
        <div className="average-estimate" role="status" aria-live="polite">
          <p>{t('averageEstimate')}</p>
          <span className="average-value" aria-label={`Average estimate: ${averageEstimate}`}>
            {averageEstimate}
          </span>
        </div>
      )}
    </div>
  );
});

UserList.displayName = 'UserList';

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selectedCard: PropTypes.string,
  })).isRequired,
  showCards: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
};

export default UserList;
