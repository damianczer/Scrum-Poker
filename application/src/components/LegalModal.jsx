import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import useFocusTrap from '../hooks/useFocusTrap';
import '../styles/_legalModal.scss';

const LegalModal = memo(function LegalModal({ title, content, onClose }) {
  const focusTrapRef = useFocusTrap();
  
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
      aria-labelledby="legal-modal-title"
      onClick={handleOverlayClick}
      ref={focusTrapRef}
    >
      <div className="legal-modal">
        <div className="legal-modal-header">
          <h2 id="legal-modal-title">{title}</h2>
          <button 
            className="legal-modal-close" 
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <span aria-hidden="true">×</span>
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
