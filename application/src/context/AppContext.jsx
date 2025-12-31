import { createContext, useContext } from 'react';
import { useSettings } from '../hooks/useSettings';
import PropTypes from 'prop-types';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const settings = useSettings();

    return (
        <AppContext.Provider value={settings}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export default AppContext;
