import { useState, useEffect, useRef, useCallback } from 'react';
import {
    createSessionInDb,
    getSessionFromDb,
    updateSessionUsers,
    toggleCardsInDb,
    resetVotesInDb,
    subscribeToSessionChanges,
    addUserToSession
} from '../services/firebaseService';
import {
    validateSessionName,
    validateSessionId,
    isSessionFull,
    usernameExists
} from '../utils/validation';

export const useSession = (username) => {
    const [sessionId, setSessionId] = useState('');
    const [sessionName, setSessionName] = useState('');
    const [users, setUsers] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const unsubscribeRef = useRef(null);
    const isResettingRef = useRef(false);

    useEffect(() => {
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, []);

    const subscribeToSession = useCallback((id) => {
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }

        unsubscribeRef.current = subscribeToSessionChanges(id, (data) => {
            if (!isResettingRef.current) {
                setUsers(data.users);
                setShowCards(data.showCards);
            }
        });
    }, []);

    const createSession = useCallback(async (name) => {
        const validation = validateSessionName(name);
        if (!validation.isValid) {
            setError(validation.errorKey);
            return { success: false, errorKey: validation.errorKey };
        }

        setIsLoading(true);
        setError(null);

        try {
            const { id, data } = await createSessionInDb(name, username);

            setSessionId(id);
            setSessionName(name);
            setIsSessionActive(true);
            setUsers(data.users);

            subscribeToSession(id);

            return { success: true, sessionId: id };
        } catch (err) {
            const errorKey = 'errorCreatingSession';
            setError(errorKey);
            console.error('Failed to create session:', err);
            return { success: false, errorKey, message: err.message };
        } finally {
            setIsLoading(false);
        }
    }, [username, subscribeToSession]);

    const joinSession = useCallback(async (id) => {
        const validation = validateSessionId(id);
        if (!validation.isValid) {
            setError(validation.errorKey);
            return { success: false, errorKey: validation.errorKey };
        }

        setIsLoading(true);
        setError(null);

        try {
            const { exists, data: sessionData } = await getSessionFromDb(id);

            if (!exists) {
                setError('sessionIdNotExist');
                return { success: false, errorKey: 'sessionIdNotExist' };
            }

            const existingUsers = sessionData.users;

            if (isSessionFull(existingUsers)) {
                setError('sessionFull');
                return { success: false, errorKey: 'sessionFull' };
            }

            if (usernameExists(existingUsers, username)) {
                setError('usernameExists');
                return { success: false, errorKey: 'usernameExists' };
            }

            const updatedUsers = await addUserToSession(id, username, existingUsers);

            setSessionId(id);
            setSessionName(sessionData.sessionName);
            setUsers(updatedUsers);
            setIsSessionActive(true);
            subscribeToSession(id);

            return { success: true };
        } catch (err) {
            const errorKey = 'errorJoiningSession';
            setError(errorKey);
            console.error('Failed to join session:', err);
            return { success: false, errorKey, message: err.message };
        } finally {
            setIsLoading(false);
        }
    }, [username, subscribeToSession]);

    const selectCard = useCallback(async (card) => {
        if (!sessionId) return;

        const updatedUsers = users.map((user) =>
            user.name === username ? { ...user, selectedCard: card } : user
        );

        setUsers(updatedUsers);

        try {
            await updateSessionUsers(sessionId, updatedUsers);
        } catch (err) {
            setUsers(users);
            console.error('Failed to select card:', err);
            setError('errorSelectingCard');
        }
    }, [sessionId, users, username]);

    const toggleCards = useCallback(async () => {
        if (!sessionId) return;

        const newShowCards = !showCards;

        setShowCards(newShowCards);

        try {
            await toggleCardsInDb(sessionId, newShowCards);
        } catch (err) {
            setShowCards(showCards);
            console.error('Failed to toggle cards:', err);
            setError('errorTogglingCards');
        }
    }, [sessionId, showCards]);

    const resetVotes = useCallback(async () => {
        if (!sessionId) return;

        isResettingRef.current = true;

        const updatedUsers = users.map(user => ({ ...user, selectedCard: null }));

        setUsers(updatedUsers);
        setShowCards(false);

        try {
            await resetVotesInDb(sessionId, updatedUsers);
        } catch (err) {
            console.error('Failed to reset votes:', err);
            setError('errorResettingVotes');
        } finally {
            isResettingRef.current = false;
        }
    }, [sessionId, users]);

    const shareSession = useCallback(async () => {
        if (!sessionId) return false;

        try {
            await navigator.clipboard.writeText(sessionId);
            return true;
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            return false;
        }
    }, [sessionId]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        sessionId,
        setSessionId,
        sessionName,
        setSessionName,
        users,
        showCards,
        isSessionActive,
        error,
        isLoading,
        createSession,
        joinSession,
        selectCard,
        toggleCards,
        resetVotes,
        shareSession,
        clearError,
    };
};

export default useSession;
