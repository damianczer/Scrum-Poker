import { useCallback, useId } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
    id,
    label,
    value,
    onChange,
    onSubmit,
    placeholder = '',
    errorMessage = '',
    disabled = false,
    autoFocus = false,
    type = 'text',
    className = '',
    required = false,
}) => {
    const errorId = useId();
    
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !disabled && onSubmit) {
            onSubmit();
        }
    }, [disabled, onSubmit]);

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    const hasError = Boolean(errorMessage);

    return (
        <>
            <label htmlFor={id} className={`${className}-label fade-in`}>
                {label}
                {required && <span className="sr-only"> (required)</span>}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${className}-input fade-in${hasError ? ' input-error' : ''}`}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                disabled={disabled}
                autoComplete="off"
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                aria-required={required}
            />
            {errorMessage && (
                <div 
                    id={errorId}
                    className="error-message fade-in" 
                    role="alert"
                    aria-live="assertive"
                >
                    {errorMessage}
                </div>
            )}
        </>
    );
};

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
};

export default FormInput;
