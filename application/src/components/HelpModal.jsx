import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from '../utils/i18n';
import '../styles/_helpModal.scss';

const HelpModal = memo(function HelpModal({ language, onClose }) {
  const t = useTranslation(language, 'help');

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
      className="help-modal-overlay" 
      role="dialog" 
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className="help-modal">
        <div className="help-modal-header">
          <h2>{t('title')}</h2>
          <button 
            className="help-modal-close" 
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="help-modal-content">
          <h3>{t('sections.ready.title')}</h3>
          <p>{t('sections.ready.text')}</p>

          <h3>{t('sections.estimating.title')}</h3>
          <p>{t('sections.estimating.text')}</p>

          <h3>{t('sections.storyPoints.title')}</h3>
          <p>{t('sections.storyPoints.text')}</p>

          <h3>{t('sections.results.title')}</h3>
          <p>{t('sections.results.text')}</p>

          <h3>{t('sections.importance.title')}</h3>
          <p>{t('sections.importance.text')}</p>
        </div>
      </div>
    </div>
  );
});

HelpModal.displayName = 'HelpModal';

HelpModal.propTypes = {
  language: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HelpModal;
