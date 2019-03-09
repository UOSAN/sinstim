import React from 'react';
import PropTypes from 'prop-types';

import './consent.scss';

const Consent = (props) => {
    const { text, isConsented, onConsentAccept, onConsentDecline } = props;

    function renderDeclinedConsent() {
        const declinedConsentMessage = 'Thank you. Please go back to mTurk and decline this HIT.';

        return (
            <div className="consent-declined-text">{declinedConsentMessage}</div>
        );
    }

    function renderConsent() {
        return (
            <>
                <div className="consent-header card-header card-header-title is-centered">Consent</div>
                <div className="consent-text card-content">{text}</div>
                <div className="consent-buttons card-footer">
                    <span className="consent-decline">
                        <button className="button is-dark is-outlined" onClick={onConsentDecline} type="button">Decline</button>
                    </span>
                    <span className="consent-accept">
                        <button className="button is-primary is-outlined" onClick={onConsentAccept} type="button">Accept</button>
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
    isConsented: PropTypes.bool,
    onConsentAccept: PropTypes.func.isRequired,
    onConsentDecline: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Consent;
