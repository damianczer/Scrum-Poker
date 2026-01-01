import { useCallback, memo, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../styles/_shareModal.scss';
import { useTranslation } from '../utils/i18n';
import Button from './common/Button';

const ShareModal = memo(function ShareModal({ sessionId, language, onClose }) {
    const t = useTranslation(language, 'cardSelection');
    const [linkCopied, setLinkCopied] = useState(false);

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
            onClick={handleOverlayClick}
        >
            <div className="share-modal">
                <h3 className="share-modal-title">{t('shareTitle')}</h3>

                <div className="share-modal-section">
                    <p className="share-modal-message">{t('sessionCopied')}</p>
                    <p className="share-modal-session-id">{sessionId}</p>
                </div>

                <div className="share-modal-divider">
                    <span>{t('orShareLink')}</span>
                </div>

                <div className="share-modal-section">
                    <Button
                        variant="primary"
                        onClick={handleCopyLink}
                        className="share-link-button"
                    >
                        {linkCopied ? t('linkCopied') : t('copyLink')}
                    </Button>
                </div>

                <Button
                    variant="reset"
                    onClick={handleClose}
                    className="share-close-button"
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
