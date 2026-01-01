import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/_cardSelection.scss';
import { useTranslation } from '../utils/i18n';
import { POKER_CARDS } from '../constants/constants';
import { getCurrentUserCard } from '../utils/cardUtils';
import { getAssetPath } from '../constants/config';
import UserList from './UserList';
import Button from './common/Button';
import ShareModal from './ShareModal';
import SessionTimer from './SessionTimer';

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
  const tCommon = useTranslation(language, 'common');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Warn user before leaving active session
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = tCommon('leaveSessionWarning');
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [tCommon]);

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
      <h1 className="sr-only">{t('pageTitle') || 'Voting Session'}</h1>
      <div className="session-info" role="status" aria-live="polite">
        <span className="session-label">{t('session')}: <strong>{sessionName}</strong></span>
        <span className="users-label">{t('usersCount')}: <strong>{users.length}</strong></span>
        <SessionTimer label={t('sessionTime')} />
      </div>
      <div className="card-selection fade-in">
        <div 
          className="cards" 
          role="radiogroup" 
          aria-label={t('selectCard') || 'Select your estimate'}
        >
          {POKER_CARDS.map((card) => (
            <Button
              key={card}
              variant="card"
              className={currentUserCard === card ? 'selected' : ''}
              onClick={() => handleCardClick(card)}
              ariaLabel={card === '?' ? 'Select coffee break (pass)' : `Select ${card} story points`}
              aria-pressed={currentUserCard === card}
              role="radio"
              aria-checked={currentUserCard === card}
            >
              {card === '?' ? (
                <img src={getAssetPath('/assets/icons/coffee.svg')} alt="" className="card-coffee-icon" aria-hidden="true" />
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

        <div className="action-buttons" role="group" aria-label={t('sessionActions') || 'Session actions'}>
          <Button variant="reset" onClick={onResetVotes} ariaLabel={t('resetVotes')}>
            {t('resetVotes')}
          </Button>
          <Button onClick={onToggleCards} ariaLabel={showCards ? t('hideCards') : t('showCards')}>
            {showCards ? t('hideCards') : t('showCards')}
          </Button>
          <Button onClick={handleShareClick} ariaLabel={t('shareSession')} aria-haspopup="dialog">
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
