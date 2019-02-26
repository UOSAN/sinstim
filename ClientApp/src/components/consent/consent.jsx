import React from 'react';
import PropTypes from 'prop-types';

import './consent.scss';

const Consent = (props) => {
    const { consentText, isConsented, onConsentAccept, onConsentDecline } = props;

    function renderDeclinedConsent() {
        const declinedConsentMessage = 'Thank you. Please go back to mTurk and decline this HIT.';

        return (
            <div className="consent-declined-text">{declinedConsentMessage}</div>
        );
    }

    function renderConsent() {
        return (
            <>
                <div className="consent-header card-header text-center">Consent</div>
                <div className="consent-text card-body">{consentText}</div>
                <div className="consent-buttons">
                    <span className="consent-decline">
                        <button className="btn btn-outline-secondary" onClick={onConsentDecline} type="button">Decline</button>
                    </span>
                    <span className="consent-accept">
                        <button className="btn btn-outline-primary" onClick={onConsentAccept} type="button">Accept</button>
                    </span>
                </div>
            </>
        );
    }

    return (
        <div className="consent card">
            {isConsented === false ? renderDeclinedConsent() : renderConsent()}
        </div>
    );
};

Consent.propTypes = {
    consentText: PropTypes.string.isRequired,
    isConsented: PropTypes.bool,
    onConsentAccept: PropTypes.func.isRequired,
    onConsentDecline: PropTypes.func.isRequired,
};

export default Consent;
