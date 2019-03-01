import React from 'react';
import PropTypes from 'prop-types';

import placeHolderText from './survey-instructions-text';
import './survey-instructions.scss';

const SurveyInstructions = (props) => {
    return (
        <div className="survey-instructions card">
            <div className="instructions-header card-header text-center">Instructions</div>
            <div className="instructions-text card-body">{placeHolderText}</div>
            <div className="instructions-buttons">
                <span className="instructions-accept">
                    <button className="btn btn-outline-primary" onClick={props.onStartSurvey} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

SurveyInstructions.propTypes = {
    onStartSurvey: PropTypes.func.isRequired
};

export default SurveyInstructions;
