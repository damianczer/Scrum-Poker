import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/_modal.scss';

const AUTO_CLOSE_DELAY = 3000;

const Modal = memo(function Modal({ message, onClose }) {
    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        const timer = setTimeout(handleClose, AUTO_CLOSE_DELAY);
        return () => clearTimeout(timer);
    }, [handleClose]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleClose]);

    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
});

Modal.displayName = 'Modal';

Modal.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
