import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormInput from './FormInput';
import Button from './Button';

const SessionForm = ({
    icon,
    inputId,
    inputLabel,
    inputValue,
    onInputChange,
    inputPlaceholder,
    errorMessage,
    isLoading,
    submitLabel,
    loadingLabel,
    onSubmit,
    onCancel,
    cancelLabel,
}) => {
    return (
        <>
            <FontAwesomeIcon icon={icon} className="input-icon fade-in" />
            <FormInput
                id={inputId}
                label={inputLabel}
                value={inputValue}
                onChange={onInputChange}
                onSubmit={onSubmit}
                placeholder={inputPlaceholder}
                errorMessage={errorMessage}
                disabled={isLoading}
                autoFocus
                className="session"
            />
            <Button
                onClick={onSubmit}
                disabled={isLoading}
            >
                {isLoading ? loadingLabel : submitLabel}
            </Button>
            <Button
                variant="cancel"
                onClick={onCancel}
                disabled={isLoading}
            >
                {cancelLabel}
            </Button>
        </>
    );
};

SessionForm.propTypes = {
    icon: PropTypes.object.isRequired,
    inputId: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    inputPlaceholder: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    submitLabel: PropTypes.string.isRequired,
    loadingLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    cancelLabel: PropTypes.string.isRequired,
};

export default SessionForm;
