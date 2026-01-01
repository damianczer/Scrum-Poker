import { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/_content.scss';
import Header from './Header';
import GameView from './GameView';
import LobbyView from './LobbyView';
import { useTranslation } from '../utils/i18n';
import { useSession } from '../hooks/useSession';
import { useUrlSession } from '../hooks/useUrlSession';
import { validateUsername } from '../utils/validation';

const VIEW_STATES = {
  USERNAME: 'username',
  ACTIONS: 'actions',
  CREATE: 'create',
  JOIN: 'join',
  GAME: 'game',
};

const formatErrorMessage = (result, t) => {
  return result.message
    ? `${t(result.errorKey)}${result.message}`
    : t(result.errorKey);
};

function Content({ language }) {
  const [username, setUsername] = useState('');
  const [viewState, setViewState] = useState(VIEW_STATES.USERNAME);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasAutoJoined = useRef(false);

  const t = useTranslation(language, 'content');
  const tCommon = useTranslation(language, 'common');

  const { urlSessionId, setUrlSessionId, clearUrlSession } = useUrlSession();

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
      clearUrlSession();
    } else {
      setErrorMessage(formatErrorMessage(result, t));
      setUrlSessionId(null);
      setViewState(VIEW_STATES.ACTIONS);
    }
  }, [joinSession, t, clearUrlSession, setUrlSessionId]);

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
      setErrorMessage(formatErrorMessage(result, t));
    }
  }, [sessionName, createSession, t]);

  const handleJoinSessionSubmit = useCallback(async () => {
    const result = await joinSession(sessionId);

    if (result.success) {
      setErrorMessage('');
      setViewState(VIEW_STATES.GAME);
    } else {
      setErrorMessage(formatErrorMessage(result, t));
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
  }, [setUrlSessionId]);

  const handleUsernameChange = useCallback((value) => {
    setUsername(value);
    if (isSubmitted) {
      const validation = validateUsername(value);
      setErrorMessage(validation.isValid ? '' : t(validation.errorKey));
    }
  }, [isSubmitted, t]);

  const isGameActive = viewState === VIEW_STATES.GAME || isSessionActive;

  return (
    <>
      <Header
        username={viewState !== VIEW_STATES.USERNAME ? username : ''}
        language={language}
      />
      <div className="content">
        {isGameActive ? (
          <GameView
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
        ) : (
          <LobbyView
            viewState={viewState}
            username={username}
            sessionId={sessionId}
            sessionName={sessionName}
            errorMessage={errorMessage}
            isLoading={isLoading}
            t={t}
            tCommon={tCommon}
            onUsernameChange={handleUsernameChange}
            onUsernameSubmit={handleUsernameSubmit}
            onSessionIdChange={setSessionId}
            onSessionNameChange={setSessionName}
            onGoToCreate={handleGoToCreate}
            onGoToJoin={handleGoToJoin}
            onBackToActions={handleBackToActions}
            onBackToUsername={handleBackToUsername}
            onJoinSubmit={handleJoinSessionSubmit}
            onCreateSubmit={handleCreateSessionSubmit}
          />
        )}
      </div>
    </>
  );
}

Content.propTypes = {
  language: PropTypes.string.isRequired,
};

export default Content;
