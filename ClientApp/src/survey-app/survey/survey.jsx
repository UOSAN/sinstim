import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Rating from '../rating';

import './survey.scss';

const Survey = (props) => {
    const {
        assignedCategory,
        onEndSurvey,
        onRatePicture,
        surveyQuestionNumbers,
    } = props;
    const [state, setState] = useState({
        isNextButtonDisabled: true
    });

    function onRecognizabilityChange(value) {
        setState((previousState) => {
            return {
                ...previousState,
                isNextButtonDisabled: !previousState.desirability || !value,
                recognizability: value
            };
        });
    }

    function onDesirabilityChange(value) {
        setState((previousState) => {
            return {
                ...previousState,
                desirability: value,
                isNextButtonDisabled: !previousState.recognizability || !value
            };
        });
    }

    function handleOnNextClick() {
        console.log('Rating: ', state);
    }

    function renderPicture() {
        const src = `/pictures/${assignedCategory}/${assignedCategory}_${state.currentPictureIndex}.jpg`;

        return (
            <div className="picture">
                <img alt="picture" src={src} />
            </div>
        );
    }

    function renderQuestion() {
        return (
            <div className="question">
                {renderPicture()}
                <div className="recognizability">
                    <span>Recognizability</span>
                    <Rating name="recognizability" onRatingChange={onRecognizabilityChange} />
                </div>
                <div className="desirability">
                    <span>Desirability</span>
                    <Rating name="desirability" onRatingChange={onDesirabilityChange} />
                </div>
            </div>
        );
    }

    return (
        <div className="picture-survey">
            {renderQuestion()}
            <div className="navigation-buttons">
                <span className="question-next">
                    <button
                        className="btn btn-outline-primary"
                        disabled={state.isNextButtonDisabled}
                        onClick={handleOnNextClick}
                        type="button"
                        >
                        Next
                    </button>
                </span>
            </div>
        </div>
    );
};

Survey.propTypes = {
    assignedCategory: PropTypes.string.isRequired,
    onEndSurvey: PropTypes.func.isRequired,
    surveyQuestionNumbers: PropTypes.array.isRequired
};

export default Survey;
