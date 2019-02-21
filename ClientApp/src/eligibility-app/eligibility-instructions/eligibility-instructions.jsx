import React from 'react';
import PropTypes from 'prop-types';

import placeHolderText from './eligibility-instructions-text';
import './eligibility-instructions.scss';

const EligibilityInstructions = (props) => {
    return (
        <div className="eligibility-instructions card">
            <div className="instructions-header card-header text-center">Instructions</div>
            <div className="instructions-text card-body">{placeHolderText}</div>
            <div className="instructions-buttons">
                <span className="instructions-accept">
                    <button className="btn btn-outline-primary" onClick={props.onStartEligibilitySurvey} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

EligibilityInstructions.propTypes = {
    onStartEligibilitySurvey: PropTypes.func.isRequired
};

export default EligibilityInstructions;
