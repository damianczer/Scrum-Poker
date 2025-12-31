import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSession } from '../hooks/useSession';

const SessionContext = createContext(null);

export const SessionProvider = ({ children, username }) => {
    const session = useSession(username);

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

SessionProvider.propTypes = {
    children: PropTypes.node.isRequired,
    username: PropTypes.string.isRequired,
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
};

export default SessionContext;
