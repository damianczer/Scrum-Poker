import { useCallback } from 'react';
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
}) => {
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !disabled && onSubmit) {
            onSubmit();
        }
    }, [disabled, onSubmit]);

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);

    return (
        <>
            <label htmlFor={id} className={`${className}-label fade-in`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${className}-input fade-in`}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {errorMessage && (
                <div className="error-message fade-in" role="alert">
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
};

export default FormInput;
