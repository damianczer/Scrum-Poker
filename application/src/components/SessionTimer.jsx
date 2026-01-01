import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/cardUtils';

const SessionTimer = memo(function SessionTimer({ label }) {
    const [sessionTime, setSessionTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="time-label">
            {label}: <strong>{formatTime(sessionTime)}</strong>
        </span>
    );
});

SessionTimer.displayName = 'SessionTimer';

SessionTimer.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SessionTimer;
