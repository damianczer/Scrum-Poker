import { useCallback, memo, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../styles/_shareModal.scss';
import { useTranslation } from '../utils/i18n';
import useFocusTrap from '../hooks/useFocusTrap';
import Button from './common/Button';

const ShareModal = memo(function ShareModal({ sessionId, language, onClose }) {
    const t = useTranslation(language, 'cardSelection');
    const [linkCopied, setLinkCopied] = useState(false);
    const focusTrapRef = useFocusTrap();

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const handleCopyLink = useCallback(() => {
        const sessionLink = `${window.location.origin}?session=${sessionId}`;
        navigator.clipboard.writeText(sessionLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    }, [sessionId]);

    const handleOverlayClick = useCallback((e) => {
        if (e.target.classList.contains('share-modal-overlay')) {
            handleClose();
        }
    }, [handleClose]);

    return createPortal(
        <div
            className="share-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
            onClick={handleOverlayClick}
            ref={focusTrapRef}
        >
            <div className="share-modal">
                <h3 id="share-modal-title" className="share-modal-title">{t('shareTitle')}</h3>

                <div className="share-modal-section">
                    <p className="share-modal-message">{t('sessionCopied')}</p>
                    <p className="share-modal-session-id" aria-label={`Session ID: ${sessionId}`}>
                        {sessionId}
                    </p>
                </div>

                <div className="share-modal-divider" aria-hidden="true">
                    <span>{t('orShareLink')}</span>
                </div>

                <div className="share-modal-section">
                    <Button
                        variant="primary"
                        onClick={handleCopyLink}
                        className="share-link-button"
                        ariaLabel={linkCopied ? t('linkCopied') : t('copyLink')}
                        aria-live="polite"
                    >
                        {linkCopied ? t('linkCopied') : t('copyLink')}
                    </Button>
                </div>

                <Button
                    variant="reset"
                    onClick={handleClose}
                    className="share-close-button"
                    ariaLabel={t('close') + ' share dialog'}
                >
                    {t('close')}
                </Button>
            </div>
        </div>,
        document.body
    );
});

ShareModal.displayName = 'ShareModal';

ShareModal.propTypes = {
    sessionId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ShareModal;
