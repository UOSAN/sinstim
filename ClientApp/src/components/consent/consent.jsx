import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './consent.scss';

const Consent = (props) => {
    const { text, isConsented, onConsentAccept, onConsentDecline, onRejectUser } = props;

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
        // eslint-disable-next-line max-len
        const declinedConsentMessage = 'You have indicated that you want to decline this HIT. Please go back to mTurk and decline the survey there, also.';

        return (
            <>
                <div className="consent-header card-header card-header-title is-centered">Survey Declined</div>
                <div className="consent-declined-text card-content">{declinedConsentMessage}</div>
            </>
        );
    }

    function handleOnDeclineClicked() {
        onConsentDecline();
        onRejectUser();
    }

    function renderConsent() {
        const isAcceptDisabled = !hasSeenBottom;

        return (
            <>
                <div className="consent-header card-header card-header-title is-centered">Consent</div>
                <pre className="consent-text card-content" ref={preRef}>{text}</pre>
                <div className="consent-buttons card-footer">
                    <span className="consent-decline">
                        <button className="button is-dark is-outlined" onClick={handleOnDeclineClicked} type="button">Decline</button>
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
    onRejectUser: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Consent;
