import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Rating from '../rating';
import { attentionCheckTextOne, attentionCheckTextTwo } from './attention-check-text';

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
    const [shouldShowAttentionCheckOne, setShouldShowAttentionCheckOne] = useState(false);
    const [shouldShowAttentionCheckTwo, setShouldShowAttentionCheckTwo] = useState(false);
    const [attentionCheckOneIndex] = useState(() => {
        return parseInt(surveyQuestionNumbers.length / 3);
    });
    const [attentionCheckTwoIndex] = useState(() => {
        return parseInt((surveyQuestionNumbers.length / 3) + (surveyQuestionNumbers.length / 3));
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
            if (nextPictureIndex === attentionCheckOneIndex) {
                setShouldShowAttentionCheckOne(true);
            }
            if (nextPictureIndex === attentionCheckTwoIndex) {
                setShouldShowAttentionCheckTwo(true);
            }

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
            <figure className="picture image is-square">
                <img alt={assignedCategory} src={src} />
            </figure>
        );
    }

    function renderQuestion() {
        const currentPictureFileName = getCurrentPictureFileName();

        return (
            <>
                <div className="question">
                    {renderPicture(currentPictureFileName)}
                    <div className="recognizability">
                        <span className="text">Recognizability:</span>
                        <Rating
                            currentPictureFileName={currentPictureFileName}
                            onRatingChange={onRecognizabilityChange}
                            ratingName="recognizability"
                            />
                    </div>
                    <div className="desirability">
                        <span className="text">Desirability:</span>
                        <Rating
                            currentPictureFileName={currentPictureFileName}
                            onRatingChange={onDesirabilityChange}
                            ratingName="desirability"
                            />
                    </div>
                </div>
                <div className="navigation-buttons card-footer">
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
            </>
        );
    }

    function handleOnAttentionCheckNextClick() {
        if (shouldShowAttentionCheckOne) {
            setShouldShowAttentionCheckOne(false);
        }
        if (shouldShowAttentionCheckTwo) {
            setShouldShowAttentionCheckTwo(false);
        }
    }

    function renderAttentionCheck(attentionText) {
        return (
            <>
                <div className="attention-check">
                    <pre className="text">{attentionText}</pre>
                </div>
                <div className="navigation-buttons card-footer">
                    <span className="question-next">
                        <button
                            className="button is-primary is-outlined"
                            onClick={handleOnAttentionCheckNextClick}
                            type="button"
                            >
                            Next
                        </button>
                    </span>
                </div>
            </>
        );
    }

    return (
        <div className="picture-survey card">
            {shouldShowAttentionCheckOne && renderAttentionCheck(attentionCheckTextOne)}
            {shouldShowAttentionCheckTwo && renderAttentionCheck(attentionCheckTextTwo)}
            {!shouldShowAttentionCheckOne && !shouldShowAttentionCheckTwo ? renderQuestion() : null}
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
