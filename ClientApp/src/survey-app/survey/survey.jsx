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
        currentPictureIndex: 0
    });

    function onRecognizabilityChange(value) {
        setState((previousState) => {
            return {
                ...previousState,
                recognizability: value
            };
        });
    }

    function onDesirabilityChange(value) {
        setState((previousState) => {
            return {
                ...previousState,
                desirability: value
            };
        });
    }

    async function handleOnNextClick() {
        await onRatePicture({
            fileName: getCurrentPictureFileName(),
            desirability: state.desirability,
            recognizability: state.recognizability
        });

        const nextPictureIndex = state.currentPictureIndex + 1;

        if (nextPictureIndex >= surveyQuestionNumbers.length) {
            await onEndSurvey();
        } else {
            setState((previousState) => {
                return {
                    ...previousState,
                    currentPictureIndex: nextPictureIndex,
                    desirability: null,
                    recognizability: null
                };
            });
        }
    }

    function getCurrentPictureFileName() {
        const pictureNumber = surveyQuestionNumbers[state.currentPictureIndex];

        return `${assignedCategory}_${pictureNumber}.jpg`;
    }

    function renderPicture(currentPictureFileName) {
        const src = `/pictures/${assignedCategory}/${currentPictureFileName}`;

        return (
            <div className="picture">
                <img alt={assignedCategory} src={src} />
            </div>
        );
    }

    function renderQuestion() {
        const currentPictureFileName = getCurrentPictureFileName();

        return (
            <div className="question">
                {renderPicture(currentPictureFileName)}
                <div className="recognizability">
                    <span>Recognizability</span>
                    <Rating
                        currentPictureFileName={currentPictureFileName}
                        onRatingChange={onRecognizabilityChange}
                        ratingName="recognizability"
                        />
                </div>
                <div className="desirability">
                    <span>Desirability</span>
                    <Rating
                        currentPictureFileName={currentPictureFileName}
                        onRatingChange={onDesirabilityChange}
                        ratingName="desirability"
                        />
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
                        className="button is-primary is-outlined"
                        disabled={!state.desirability || !state.recognizability}
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
    onRatePicture: PropTypes.func.isRequired,
    surveyQuestionNumbers: PropTypes.array.isRequired
};

export default Survey;
