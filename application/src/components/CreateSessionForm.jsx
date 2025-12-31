import PropTypes from 'prop-types';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SessionForm from './common/SessionForm';

const CreateSessionForm = ({
    sessionName,
    onSessionNameChange,
    onSubmit,
    onCancel,
    errorMessage,
    isLoading,
    t
}) => {
    return (
        <SessionForm
            icon={faPlusCircle}
            inputId="session-name"
            inputLabel={t('createSessionLabel')}
            inputValue={sessionName}
            onInputChange={onSessionNameChange}
            inputPlaceholder={t('sessionNamePlaceholder')}
            errorMessage={errorMessage}
            isLoading={isLoading}
            submitLabel={t('createSession')}
            loadingLabel={t('loading')}
            onSubmit={onSubmit}
            onCancel={onCancel}
            cancelLabel={t('cancel')}
        />
    );
};

CreateSessionForm.propTypes = {
    sessionName: PropTypes.string.isRequired,
    onSessionNameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    t: PropTypes.func.isRequired,
};

export default CreateSessionForm;
