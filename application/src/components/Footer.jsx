import { useContext, useMemo, useState, useCallback, memo } from 'react';
import '../styles/_footer.scss';
import { useTranslation } from '../utils/i18n';
import { ThemeContext } from '../App';
import LegalModal from './LegalModal';

const MODAL_TYPES = {
  NONE: null,
  TERMS: 'terms',
  PRIVACY: 'privacy',
};

const Footer = memo(function Footer() {
  const { language } = useContext(ThemeContext);
  const t = useTranslation(language, 'footer');
  const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const handleOpenTerms = useCallback((e) => {
    e.preventDefault();
    setActiveModal(MODAL_TYPES.TERMS);
  }, []);

  const handleOpenPrivacy = useCallback((e) => {
    e.preventDefault();
    setActiveModal(MODAL_TYPES.PRIVACY);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(MODAL_TYPES.NONE);
  }, []);

  const renderTermsContent = () => (
    <>
      <h3>{t('termsContent.introduction.title')}</h3>
      <p>{t('termsContent.introduction.text')}</p>

      <h3>{t('termsContent.usage.title')}</h3>
      <p>{t('termsContent.usage.text')}</p>

      <h3>{t('termsContent.account.title')}</h3>
      <p>{t('termsContent.account.text')}</p>

      <h3>{t('termsContent.limitations.title')}</h3>
      <p>{t('termsContent.limitations.text')}</p>

      <h3>{t('termsContent.changes.title')}</h3>
      <p>{t('termsContent.changes.text')}</p>
    </>
  );

  const renderPrivacyContent = () => (
    <>
      <h3>{t('privacyContent.introduction.title')}</h3>
      <p>{t('privacyContent.introduction.text')}</p>

      <h3>{t('privacyContent.dataCollection.title')}</h3>
      <p>{t('privacyContent.dataCollection.text')}</p>

      <h3>{t('privacyContent.cookies.title')}</h3>
      <p>{t('privacyContent.cookies.text')}</p>

      <h3>{t('privacyContent.dataUsage.title')}</h3>
      <p>{t('privacyContent.dataUsage.text')}</p>

      <h3>{t('privacyContent.contact.title')}</h3>
      <p>{t('privacyContent.contact.text')}</p>
    </>
  );

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <p className="copyright">
            Copyright &copy; {currentYear} {t('copyright')}
          </p>

          <p className="created-by">
            {t('createdBy')}{' '}
            <a
              href="https://www.damianczerwinski.pl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Damian Czerwiński - opens in new tab"
            >
              Damian Czerwiński
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>

          <nav className="footer-links" aria-label="Legal links">
            <a href="/terms-of-service" onClick={handleOpenTerms}>
              {t('termsOfService')}
            </a>
            <span className="separator" aria-hidden="true">|</span>
            <a href="/privacy-policy" onClick={handleOpenPrivacy}>
              {t('privacyPolicy')}
            </a>
          </nav>
        </div>
      </footer>

      {activeModal === MODAL_TYPES.TERMS && (
        <LegalModal
          title={t('termsOfService')}
          content={renderTermsContent()}
          onClose={handleCloseModal}
        />
      )}

      {activeModal === MODAL_TYPES.PRIVACY && (
        <LegalModal
          title={t('privacyPolicy')}
          content={renderPrivacyContent()}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
