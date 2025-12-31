import { SESSION_CONFIG } from '../constants/constants';

export const validateUsername = (username) => {
    const trimmed = username.trim();

    if (trimmed.length < SESSION_CONFIG.MIN_USERNAME_LENGTH) {
        return { isValid: false, errorKey: 'usernameErrorShort' };
    }

    if (trimmed.length > SESSION_CONFIG.MAX_USERNAME_LENGTH) {
        return { isValid: false, errorKey: 'usernameErrorLong' };
    }

    return { isValid: true, errorKey: null };
};

export const validateSessionName = (sessionName) => {
    const trimmed = sessionName.trim();

    if (trimmed.length < SESSION_CONFIG.MIN_SESSION_NAME_LENGTH) {
        return { isValid: false, errorKey: 'sessionNameError' };
    }

    return { isValid: true, errorKey: null };
};

export const validateSessionId = (sessionId) => {
    if (!sessionId.trim()) {
        return { isValid: false, errorKey: 'sessionIdError' };
    }

    return { isValid: true, errorKey: null };
};

export const isSessionFull = (users) => {
    return users.length >= SESSION_CONFIG.MAX_USERS;
};

export const usernameExists = (users, username) => {
    return users.some(user => user.name === username);
};
