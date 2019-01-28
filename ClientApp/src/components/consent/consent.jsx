import React from 'react';
import PropTypes from 'prop-types';
import placeHolderText from './consent-text';

import './consent.scss';

const Consent = (props) => {
    function handleOnSubmitClick() {
        props.onSubmitConsent();
    }

    return (
        <div className="consent">
            <div className="consent-text">{placeHolderText}</div>
            <div className="consent-submit">
                <button className="btn btn-primary" onClick={handleOnSubmitClick} type="button">OK</button>
            </div>
        </div>
    );
};

Consent.propTypes = {
    onSubmitConsent: PropTypes.func.isRequired,
};

export default Consent;
