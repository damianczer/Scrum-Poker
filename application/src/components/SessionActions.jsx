import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '../utils/icons';
import Button from './common/Button';

const SessionActions = memo(function SessionActions({
    onCreateSession,
    onJoinSession,
    onCancel,
    t
}) {
    return (
        <>
            <FontAwesomeIcon icon={faHourglassHalf} className="input-icon fade-in" />
            <p className="choose-option fade-in">{t('chooseOption')}</p>
            <Button onClick={onCreateSession}>
                {t('createSession')}
            </Button>
            <Button onClick={onJoinSession}>
                {t('joinSession')}
            </Button>
            <Button variant="cancel" onClick={onCancel}>
                {t('cancel')}
            </Button>
        </>
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
