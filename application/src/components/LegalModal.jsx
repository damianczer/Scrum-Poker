import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import '../styles/_legalModal.scss';

const LegalModal = memo(function LegalModal({ title, content, onClose }) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return (
    <div 
      className="legal-modal-overlay" 
      role="dialog" 
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="legal-modal">
        <div className="legal-modal-header">
          <h2>{title}</h2>
          <button 
            className="legal-modal-close" 
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="legal-modal-content">
          {content}
        </div>
      </div>
    </div>
  );
});

LegalModal.displayName = 'LegalModal';

LegalModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LegalModal;
