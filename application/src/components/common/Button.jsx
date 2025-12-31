import { memo } from 'react';
import PropTypes from 'prop-types';

const Button = memo(function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    type = 'button',
    ariaLabel,
    ...rest
}) {
    const variantClasses = {
        primary: 'option-button',
        cancel: 'option-button cancel',
        reset: 'option-button reset',
        card: 'card-option',
        control: 'control-btn',
        share: 'share-button',
    };

    const baseClass = variantClasses[variant] || variantClasses.primary;
    const combinedClassName = `${baseClass} fade-in ${className}`.trim();

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            {...rest}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'cancel', 'reset', 'card', 'control', 'share']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    ariaLabel: PropTypes.string,
};

export default Button;
