import { useState, useCallback, Suspense, lazy, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/_content.scss';
import Header from './Header';
import UsernameForm from './UsernameForm';
import SessionActions from './SessionActions';
import JoinSessionForm from './JoinSessionForm';
import CreateSessionForm from './CreateSessionForm';
import { useTranslation } from '../utils/i18n';
import { useSession } from '../hooks/useSession';
import { validateUsername } from '../utils/validation';

const CardSelection = lazy(() => import('./CardSelection'));

const VIEW_STATES = {
  USERNAME: 'username',
  ACTIONS: 'actions',
  CREATE: 'create',
  JOIN: 'join',
  GAME: 'game',
};

function Content({ language }) {
  const [username, setUsername] = useState('');
  const [viewState, setViewState] = useState(VIEW_STATES.USERNAME);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [urlSessionId, setUrlSessionId] = useState(null);
  const hasAutoJoined = useRef(false);

  const t = useTranslation(language, 'content');
  const tCommon = useTranslation(language, 'common');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    if (sessionParam) {
      setUrlSessionId(sessionParam);
    }
  }, []);

  const session = useSession(username);
  const {
    sessionId,
    setSessionId,
    sessionName,
    setSessionName,
    users,
    showCards,
    isSessionActive,
    isLoading,
    createSession,
    joinSession,
    selectCard,
    toggleCards,
    resetVotes,
    shareSession,
  } = session;

  const handleAutoJoinSession = useCallback(async (targetSessionId) => {
    const result = await joinSession(targetSessionId);

    if (result.success) {
      setErrorMessage('');
      setViewState(VIEW_STATES.GAME);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const message = result.message
        ? `${t(result.errorKey)}${result.message}`
        : t(result.errorKey);
      setErrorMessage(message);
      setUrlSessionId(null);
      setViewState(VIEW_STATES.ACTIONS);
    }
  }, [joinSession, t]);

  const handleUsernameSubmit = useCallback(async () => {
    setIsSubmitted(true);
    const validation = validateUsername(username);

    if (!validation.isValid) {
      setErrorMessage(t(validation.errorKey));
      return;
    }

    setErrorMessage('');

    if (urlSessionId && !hasAutoJoined.current) {
      hasAutoJoined.current = true;
      setSessionId(urlSessionId);
      await handleAutoJoinSession(urlSessionId);
    } else {
      setViewState(VIEW_STATES.ACTIONS);
    }
  }, [username, t, urlSessionId, setSessionId, handleAutoJoinSession]);

  const handleCreateSessionSubmit = useCallback(async () => {
    const result = await createSession(sessionName);

    if (result.success) {
      setErrorMessage('');
      setViewState(VIEW_STATES.GAME);
    } else {
      const message = result.message
        ? `${t(result.errorKey)}${result.message}`
        : t(result.errorKey);
      setErrorMessage(message);
    }
  }, [sessionName, createSession, t]);

  const handleJoinSessionSubmit = useCallback(async () => {
    const result = await joinSession(sessionId);

    if (result.success) {
      setErrorMessage('');
      setViewState(VIEW_STATES.GAME);
    } else {
      const message = result.message
        ? `${t(result.errorKey)}${result.message}`
        : t(result.errorKey);
      setErrorMessage(message);
    }
  }, [sessionId, joinSession, t]);

  const handleGoToCreate = useCallback(() => {
    setViewState(VIEW_STATES.CREATE);
    setErrorMessage('');
  }, []);

  const handleGoToJoin = useCallback(() => {
    setViewState(VIEW_STATES.JOIN);
    setErrorMessage('');
  }, []);

  const handleBackToActions = useCallback(() => {
    setViewState(VIEW_STATES.ACTIONS);
    setErrorMessage('');
  }, []);

  const handleBackToUsername = useCallback(() => {
    setViewState(VIEW_STATES.USERNAME);
    setUsername('');
    setIsSubmitted(false);
    setErrorMessage('');
    setUrlSessionId(null);
    hasAutoJoined.current = false;
  }, []);

  const handleUsernameChange = useCallback((value) => {
    setUsername(value);
    if (isSubmitted) {
      const validation = validateUsername(value);
      setErrorMessage(validation.isValid ? '' : t(validation.errorKey));
    }
  }, [isSubmitted, t]);

  const renderContent = () => {
    if (viewState === VIEW_STATES.GAME || isSessionActive) {
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
            onCardSelect={selectCard}
            onToggleCards={toggleCards}
            onResetVotes={resetVotes}
            onShareSession={shareSession}
          />
        </Suspense>
      );
    }

    return (
      <>
        <div className="hero-description fade-in">
          <h1>{t('heroTitle')}</h1>
        </div>
        <div className="card fade-in">
          {viewState === VIEW_STATES.USERNAME && (
            <UsernameForm
              username={username}
              onUsernameChange={handleUsernameChange}
              onSubmit={handleUsernameSubmit}
              errorMessage={errorMessage}
              t={t}
            />
          )}

          {viewState === VIEW_STATES.ACTIONS && (
            <SessionActions
              onCreateSession={handleGoToCreate}
              onJoinSession={handleGoToJoin}
              onCancel={handleBackToUsername}
              t={t}
            />
          )}

          {viewState === VIEW_STATES.JOIN && (
            <JoinSessionForm
              sessionId={sessionId}
              onSessionIdChange={setSessionId}
              onSubmit={handleJoinSessionSubmit}
              onCancel={handleBackToActions}
              errorMessage={errorMessage}
              isLoading={isLoading}
              t={(key) => key === 'loading' ? tCommon('loading') : t(key)}
            />
          )}

          {viewState === VIEW_STATES.CREATE && (
            <CreateSessionForm
              sessionName={sessionName}
              onSessionNameChange={setSessionName}
              onSubmit={handleCreateSessionSubmit}
              onCancel={handleBackToActions}
              errorMessage={errorMessage}
              isLoading={isLoading}
              t={(key) => key === 'loading' ? tCommon('loading') : t(key)}
            />
          )}
        </div>
        <p className="hero-subtitle fade-in">{t('heroSubtitle')}</p>
      </>
    );
  };

  return (
    <>
      <Header
        username={viewState !== VIEW_STATES.USERNAME ? username : ''}
        language={language}
      />
      <div className="content">
        {renderContent()}
      </div>
    </>
  );
}

Content.propTypes = {
  language: PropTypes.string.isRequired,
};

export default Content;
