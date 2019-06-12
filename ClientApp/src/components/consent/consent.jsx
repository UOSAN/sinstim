import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './consent.scss';

const Consent = (props) => {
    const { text, isConsented, onConsentAccept, onConsentDecline } = props;

    const [hasSeenBottom, setHasSeenBottom] = useState(false);
    const preRef = useRef(null);

    useEffect(() => {
        if (preRef != null) {
            preRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            preRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleScroll(evt) {
        if (evt.target.scrollTop === (evt.target.scrollHeight - evt.target.offsetHeight)) {
            setHasSeenBottom(true);
        }
    }

    function renderDeclinedConsent() {
        const declinedConsentMessage = 'Thank you. Please go back to mTurk and decline this HIT.';

        return (
            <>
                <div className="consent-header card-header card-header-title is-centered">Consent Declined</div>
                <div className="consent-declined-text card-content">{declinedConsentMessage}</div>
            </>
        );
    }

    function renderConsent() {
        const isAcceptDisabled = !hasSeenBottom;

        return (
            <>
                <div className="consent-header card-header card-header-title is-centered">Consent</div>
                <pre className="consent-text card-content" ref={preRef}>{text}</pre>
                <div className="consent-buttons card-footer">
                    <span className="consent-decline">
                        <button className="button is-dark is-outlined" onClick={onConsentDecline} type="button">Decline</button>
                    </span>
                    <span className="consent-accept">
                        <button
                            className="button is-primary is-outlined"
                            disabled={isAcceptDisabled}
                            onClick={onConsentAccept}
                            type="button"
                            >
                            Accept
                        </button>
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
