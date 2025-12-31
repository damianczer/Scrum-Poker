import { useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/_cardSelection.scss';
import { useTranslation } from '../utils/i18n';
import { POKER_CARDS } from '../constants/constants';
import { getCurrentUserCard } from '../utils/cardUtils';
import UserList from './UserList';
import Button from './common/Button';

const CardSelection = memo(function CardSelection({
  users,
  showCards,
  username,
  language,
  onCardSelect,
  onToggleCards,
  onResetVotes,
}) {
  const t = useTranslation(language, 'cardSelection');

  const currentUserCard = useMemo(() =>
    getCurrentUserCard(users, username),
    [users, username]
  );

  const handleCardClick = useCallback((card) => {
    onCardSelect(card);
  }, [onCardSelect]);

  return (
    <div className="card-selection-container">
      <div className="card-selection fade-in">
        <div className="cards">
          {POKER_CARDS.map((card) => (
            <Button
              key={card}
              variant="card"
              className={currentUserCard === card ? 'selected' : ''}
              onClick={() => handleCardClick(card)}
              ariaLabel={`Select card ${card}`}
              aria-pressed={currentUserCard === card}
            >
              {card}
            </Button>
          ))}
        </div>

        <UserList
          users={users}
          showCards={showCards}
          language={language}
        />

        <div className="action-buttons">
          <Button variant="reset" onClick={onResetVotes}>
            {t('resetVotes')}
          </Button>
          <Button onClick={onToggleCards}>
            {showCards ? t('hideCards') : t('showCards')}
          </Button>
        </div>
      </div>
    </div>
  );
});

CardSelection.displayName = 'CardSelection';

CardSelection.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selectedCard: PropTypes.string,
  })).isRequired,
  showCards: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  onToggleCards: PropTypes.func.isRequired,
  onResetVotes: PropTypes.func.isRequired,
};

export default CardSelection;
