import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/_cardSelection.scss';
import { useTranslation } from '../utils/i18n';
import { POKER_CARDS } from '../constants/constants';
import { getCurrentUserCard } from '../utils/cardUtils';
import UserList from './UserList';
import Button from './common/Button';
import ShareModal from './ShareModal';

const CardSelection = memo(function CardSelection({
  users,
  showCards,
  username,
  language,
  sessionName,
  sessionId,
  onCardSelect,
  onToggleCards,
  onResetVotes,
  onShareSession,
}) {
  const t = useTranslation(language, 'cardSelection');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = useCallback((totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const currentUserCard = useMemo(() =>
    getCurrentUserCard(users, username),
    [users, username]
  );

  const handleCardClick = useCallback((card) => {
    onCardSelect(card);
  }, [onCardSelect]);

  const handleShareClick = useCallback(() => {
    onShareSession?.();
    setIsModalVisible(true);
  }, [onShareSession]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <div className="card-selection-container">
      <div className="session-info">
        <span className="session-label">{t('session')}: <strong>{sessionName}</strong></span>
        <span className="users-label">{t('usersCount')}: <strong>{users.length}</strong></span>
        <span className="time-label">{t('sessionTime')}: <strong>{formatTime(sessionTime)}</strong></span>
      </div>
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
              {card === '?' ? (
                <img src="/coffee.svg" alt="coffee" className="card-coffee-icon" />
              ) : (
                card
              )}
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
          <Button onClick={handleShareClick}>
            {t('shareSession')}
          </Button>
        </div>

        {isModalVisible && (
          <ShareModal
            sessionId={sessionId}
            language={language}
            onClose={handleCloseModal}
          />
        )}
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
  sessionName: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  onToggleCards: PropTypes.func.isRequired,
  onResetVotes: PropTypes.func.isRequired,
  onShareSession: PropTypes.func.isRequired,
};

export default CardSelection;
