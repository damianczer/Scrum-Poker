import PropTypes from 'prop-types';
import FormInput from './FormInput';
import Button from './Button';

const SessionForm = ({
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
        <div className="session-form">
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
                {isLoading ? (
                    <span className="button-spinner"></span>
                ) : submitLabel}
            </Button>
            <Button
                variant="cancel"
                onClick={onCancel}
                disabled={isLoading}
            >
                {cancelLabel}
            </Button>
        </div>
    );
};

SessionForm.propTypes = {
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
