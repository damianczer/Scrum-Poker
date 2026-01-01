import { memo } from 'react';
import PropTypes from 'prop-types';
import UsernameForm from './UsernameForm';
import SessionActions from './SessionActions';
import JoinSessionForm from './JoinSessionForm';
import CreateSessionForm from './CreateSessionForm';

const VIEW_STATES = {
    USERNAME: 'username',
    ACTIONS: 'actions',
    CREATE: 'create',
    JOIN: 'join',
};

const LobbyView = memo(function LobbyView({
    viewState,
    username,
    sessionId,
    sessionName,
    errorMessage,
    isLoading,
    t,
    tCommon,
    onUsernameChange,
    onUsernameSubmit,
    onSessionIdChange,
    onSessionNameChange,
    onGoToCreate,
    onGoToJoin,
    onBackToActions,
    onBackToUsername,
    onJoinSubmit,
    onCreateSubmit,
}) {
    const getTranslation = (key) => key === 'loading' ? tCommon('loading') : t(key);

    return (
        <>
            <div className="hero-description fade-in">
                <h1>{t('heroTitle')}</h1>
            </div>
            <div className="card fade-in">
                {viewState === VIEW_STATES.USERNAME && (
                    <UsernameForm
                        username={username}
                        onUsernameChange={onUsernameChange}
                        onSubmit={onUsernameSubmit}
                        errorMessage={errorMessage}
                        t={t}
                    />
                )}

                {viewState === VIEW_STATES.ACTIONS && (
                    <SessionActions
                        onCreateSession={onGoToCreate}
                        onJoinSession={onGoToJoin}
                        onCancel={onBackToUsername}
                        t={t}
                    />
                )}

                {viewState === VIEW_STATES.JOIN && (
                    <JoinSessionForm
                        sessionId={sessionId}
                        onSessionIdChange={onSessionIdChange}
                        onSubmit={onJoinSubmit}
                        onCancel={onBackToActions}
                        errorMessage={errorMessage}
                        isLoading={isLoading}
                        t={getTranslation}
                    />
                )}

                {viewState === VIEW_STATES.CREATE && (
                    <CreateSessionForm
                        sessionName={sessionName}
                        onSessionNameChange={onSessionNameChange}
                        onSubmit={onCreateSubmit}
                        onCancel={onBackToActions}
                        errorMessage={errorMessage}
                        isLoading={isLoading}
                        t={getTranslation}
                    />
                )}
            </div>
            <p className="hero-subtitle fade-in">{t('heroSubtitle')}</p>
        </>
    );
});

LobbyView.propTypes = {
    viewState: PropTypes.oneOf(Object.values(VIEW_STATES)).isRequired,
    username: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    sessionName: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    t: PropTypes.func.isRequired,
    tCommon: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onUsernameSubmit: PropTypes.func.isRequired,
    onSessionIdChange: PropTypes.func.isRequired,
    onSessionNameChange: PropTypes.func.isRequired,
    onGoToCreate: PropTypes.func.isRequired,
    onGoToJoin: PropTypes.func.isRequired,
    onBackToActions: PropTypes.func.isRequired,
    onBackToUsername: PropTypes.func.isRequired,
    onJoinSubmit: PropTypes.func.isRequired,
    onCreateSubmit: PropTypes.func.isRequired,
};

export default LobbyView;
