import { memo } from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

const SessionActions = memo(function SessionActions({
    onCreateSession,
    onJoinSession,
    onCancel,
    t
}) {
    return (
        <div className="session-actions">
            <Button onClick={onCreateSession}>
                {t('createSession')}
            </Button>
            <Button onClick={onJoinSession}>
                {t('joinSession')}
            </Button>
            <Button variant="cancel" onClick={onCancel}>
                {t('cancel')}
            </Button>
        </div>
    );
});

SessionActions.displayName = 'SessionActions';

SessionActions.propTypes = {
    onCreateSession: PropTypes.func.isRequired,
    onJoinSession: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default SessionActions;
