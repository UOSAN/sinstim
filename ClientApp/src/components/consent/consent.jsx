import React from 'react';
import PropTypes from 'prop-types';
import placeHolderText from './consent-text';

import './consent.scss';

const Consent = (props) => {
    function handleOnAcceptClick() {
        props.onConsentAccept();
    }

    function handleOnDeclineClick() {
        props.onConsentDecline();
    }

    function renderDeclinedConsent() {
        const declinedConsentMessage = 'Thank you. Please go back to mTurk and decline this HIT.';

        return (
            <div className="consent-declined-text">{declinedConsentMessage}</div>
        );
    }

    if (props.isConsented === false) {
        return renderDeclinedConsent();
    }

    return (
        <div className="consent">
            <div className="consent-text">{placeHolderText}</div>
            <div className="consent-buttons">
                <span className="consent-decline">
                    <button className="btn btn-primary" onClick={handleOnDeclineClick} type="button">Decline</button>
                </span>
                <span className="consent-accept">
                    <button className="btn btn-primary" onClick={handleOnAcceptClick} type="button">Accept</button>
                </span>
            </div>
        </div>
    );
};

Consent.propTypes = {
    isConsented: PropTypes.bool,
    onConsentAccept: PropTypes.func.isRequired,
    onConsentDecline: PropTypes.func.isRequired,
};

export default Consent;
