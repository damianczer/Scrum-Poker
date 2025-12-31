import { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCookieBite } from '../utils/icons';
import FormInput from './common/FormInput';
import Button from './common/Button';

const UsernameForm = memo(function UsernameForm({
    username,
    onUsernameChange,
    onSubmit,
    errorMessage,
    t
}) {
    return (
        <>
            <FontAwesomeIcon icon={faUserCircle} className="input-icon fade-in" />
            <FormInput
                id="username"
                label={t('enterUsername')}
                value={username}
                onChange={onUsernameChange}
                onSubmit={onSubmit}
                placeholder={t('usernamePlaceholder')}
                errorMessage={errorMessage}
                autoFocus
                className="username"
            />
            <Button onClick={onSubmit}>
                {t('submit')}
            </Button>
            <div className="cookies-consent fade-in">
                <FontAwesomeIcon icon={faCookieBite} className="cookie-icon" />
                <span className="cookie-text">{t('cookiesConsent')}</span>
            </div>
        </>
    );
});

UsernameForm.displayName = 'UsernameForm';

UsernameForm.propTypes = {
    username: PropTypes.string.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    t: PropTypes.func.isRequired,
};

export default UsernameForm;
