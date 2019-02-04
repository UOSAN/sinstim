import React from 'react';
// import PropTypes from 'prop-types';

import placeHolderText from './eligibility-instructions-text';
// import './eligibility-instructions.scss';

const EligibilityInstructions = (props) => {
    function handleOnAcceptClick() {
        // props.onConsentDecline();
    }

    return (
        <div className="eligibility-instructions">
            <div className="instructions-text">{placeHolderText}</div>
            <div className="instructions-buttons">
                <span className="instructions-accept">
                    <button className="btn btn-primary" onClick={handleOnAcceptClick} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

EligibilityInstructions.propTypes = {
};

export default EligibilityInstructions;
