import React from 'react';
import PropTypes from 'prop-types';

import instructionsText from './eligibility-instructions-text';
import './eligibility-instructions.scss';

const EligibilityInstructions = (props) => {
    return (
        <div className="eligibility-instructions card">
            <div className="instructions-header card-header card-header-title is-centered">Instructions</div>
            <pre className="instructions-text card-content">{instructionsText}</pre>
            <div className="instructions-buttons card-footer">
                <span className="instructions-accept">
                    <button className="button is-primary is-outlined" onClick={props.onStartEligibilitySurvey} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

EligibilityInstructions.propTypes = {
    onStartEligibilitySurvey: PropTypes.func.isRequired
};

export default EligibilityInstructions;
