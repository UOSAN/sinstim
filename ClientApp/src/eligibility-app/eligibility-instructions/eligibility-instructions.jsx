import React from 'react';
import PropTypes from 'prop-types';

import placeHolderText from './eligibility-instructions-text';
import './eligibility-instructions.scss';

const EligibilityInstructions = (props) => {
    return (
        <div className="eligibility-instructions">
            <div className="instructions-text">{placeHolderText}</div>
            <div className="instructions-buttons">
                <span className="instructions-accept">
                    <button className="btn btn-outline-primary" onClick={props.onEligibilityInstructionsAccept} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

EligibilityInstructions.propTypes = {
    onEligibilityInstructionsAccept: PropTypes.func.isRequired
};

export default EligibilityInstructions;
