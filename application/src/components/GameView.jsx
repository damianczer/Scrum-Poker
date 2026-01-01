import { Suspense, lazy, memo } from 'react';
import PropTypes from 'prop-types';

const CardSelection = lazy(() => import('./CardSelection'));

const GameView = memo(function GameView({
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
    return (
        <Suspense fallback={
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        }>
            <CardSelection
                users={users}
                showCards={showCards}
                username={username}
                language={language}
                sessionName={sessionName}
                sessionId={sessionId}
                onCardSelect={onCardSelect}
                onToggleCards={onToggleCards}
                onResetVotes={onResetVotes}
                onShareSession={onShareSession}
            />
        </Suspense>
    );
});

GameView.propTypes = {
    users: PropTypes.array.isRequired,
    showCards: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    sessionName: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    onCardSelect: PropTypes.func.isRequired,
    onToggleCards: PropTypes.func.isRequired,
    onResetVotes: PropTypes.func.isRequired,
    onShareSession: PropTypes.func,
};

export default GameView;
