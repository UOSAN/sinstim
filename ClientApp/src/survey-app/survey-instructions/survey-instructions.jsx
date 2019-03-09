import React from 'react';
import PropTypes from 'prop-types';

import placeHolderText from './survey-instructions-text';
import './survey-instructions.scss';

const SurveyInstructions = (props) => {
    return (
        <div className="survey-instructions card">
            <div className="instructions-header card-header card-header-title is-centered">Instructions</div>
            <div className="instructions-text card-content">{placeHolderText}</div>
            <div className="instructions-buttons card-footer">
                <span className="instructions-accept">
                    <button className="button is-primary is-outlined" onClick={props.onStartSurvey} type="button">OK</button>
                </span>
            </div>
        </div>
    );
};

SurveyInstructions.propTypes = {
    onStartSurvey: PropTypes.func.isRequired
};

export default SurveyInstructions;
