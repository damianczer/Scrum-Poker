import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '../utils/icons';
import { useTranslation } from '../utils/i18n';
import { getCardColor, calculateAverage } from '../utils/cardUtils';
import '../styles/_userList.scss';

const UserList = memo(function UserList({ users, showCards, language }) {
  const t = useTranslation(language, 'content');

  const averageEstimate = useMemo(() =>
    calculateAverage(users),
    [users]
  );

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.name} className="user">
          <span className="username">{user.name}</span>
          <span
            className={`selected-card ${!showCards && user.selectedCard ? 'hidden' : ''}`}
            style={{ color: showCards ? getCardColor(user.selectedCard) : 'inherit' }}
          >
            {showCards || !user.selectedCard ? (
              user.selectedCard
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            )}
          </span>
        </div>
      ))}

      {showCards && (
        <div className="average-estimate">
          <p>{t('averageEstimate')}</p>
          <span className="average-value">{averageEstimate}</span>
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
