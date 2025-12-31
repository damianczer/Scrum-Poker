import PropTypes from 'prop-types';
import SessionForm from './common/SessionForm';

const JoinSessionForm = ({
    sessionId,
    onSessionIdChange,
    onSubmit,
    onCancel,
    errorMessage,
    isLoading,
    t
}) => {
    return (
        <SessionForm
            inputId="session-id"
            inputLabel={t('joinSessionLabel')}
            inputValue={sessionId}
            onInputChange={onSessionIdChange}
            inputPlaceholder={t('sessionIdPlaceholder')}
            errorMessage={errorMessage}
            isLoading={isLoading}
            submitLabel={t('joinSession')}
            loadingLabel={t('loading')}
            onSubmit={onSubmit}
            onCancel={onCancel}
            cancelLabel={t('cancel')}
        />
    );
};

JoinSessionForm.propTypes = {
    sessionId: PropTypes.string.isRequired,
    onSessionIdChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

export default JoinSessionForm;
