import React from 'react';
import PropTypes from 'prop-types';

import './eligibility-survey-end.scss';

const EligibilitySurveyEnd = (props) => {
    return (
        <div className="survey-end">
            <div className="survey-code">
                <span>Survey Code: {props.eligibilityCompletionCode}</span>
            </div>
        </div>
    );
};

EligibilitySurveyEnd.propTypes = {
    eligibilityCompletionCode: PropTypes.string.isRequired
};

export default EligibilitySurveyEnd;
