import React, { useEffect } from 'react';
import '../styles/_modal.scss';

const Modal = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Modal;
