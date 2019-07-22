import React from 'react';

import './survey-loading-bar.scss';

const SurveyLoadingBar = () => {
    return (
        <div className="survey-loading-bar">
            <span className="loading-bar-text">Survey Loading ...</span>
            <progress className="progress is-large is-info" max="100" />
        </div>
    );
};

export default SurveyLoadingBar;
