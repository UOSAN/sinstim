import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-graceful-image';

import Rating from '../rating';
import { attentionCheckTextOne, attentionCheckTextTwo } from './attention-check-text';
import { RECOGNIZABILITY, DESIRABILITY } from './question-category-map';
import monkeyPleaseGifSrc from '../../images/monkey-please.gif';
import lionKingPleaseGifSrc from '../../images/lion-king-please.gif';

import './survey.scss';

const Survey = (props) => {
    const {
        onEndSurvey,
        onRatePicture,
        pictureHost,
        picturesToRate,
        requestInProgress
    } = props;
    const [state, setState] = useState({
        currentPictureIndex: 0
    });
    const [shouldShowAttentionCheckOne, setShouldShowAttentionCheckOne] = useState(false);
    const [shouldShowAttentionCheckTwo, setShouldShowAttentionCheckTwo] = useState(false);
    const [attentionCheckOneIndex] = useState(() => {
        return parseInt(picturesToRate.length / 3);
    });
    const [attentionCheckTwoIndex] = useState(() => {
        return parseInt((picturesToRate.length / 3) + (picturesToRate.length / 3));
    });
    // const [isLoadingImage, setIsLoadingImage] = useState(true);
    const [isLoadingImage, setIsLoadingImage] = useState(false);


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
        const pictureToRate = picturesToRate[state.currentPictureIndex];

        await onRatePicture({
            desirability: state.desirability,
            pictureId: pictureToRate.Id,
            recognizability: state.recognizability
        });
        const nextPictureIndex = state.currentPictureIndex + 1;

        if (nextPictureIndex >= picturesToRate.length) {
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
            // setIsLoadingImage(true);
        }
    }

    function getCurrentPictureFileName() {
        const pictureToRate = picturesToRate[state.currentPictureIndex];

        return `${pictureToRate.Path}/${pictureToRate.FileName}`;
    }

    function handleOnImgLoad() {
        setIsLoadingImage(false);
    }

    function renderPicture(currentPictureFileName) {
        const src = `${pictureHost}/pictures/${currentPictureFileName}`;

        return (
            <div className="picture">
                <Img
                    alt={getSubCategory()}
                    onError={handleOnImgLoad}
                    onLoad={handleOnImgLoad}
                    retry={{ count: 3, delay: 3, accumulate: 'add' }}
                    src={src}
                    />
            </div>
        );
    }

    function getSubCategory() {
        const { FileName } = picturesToRate[state.currentPictureIndex];

        return FileName.substring(0, FileName.indexOf('_'));
    }

    function getRecognizabilityText() {
        return `How recognizable is this ${RECOGNIZABILITY[getSubCategory()]}`;
    }

    function getDesirabilityText() {
        return `How desirable is this ${DESIRABILITY[getSubCategory()]}`;
    }

    function renderQuestion() {
        const currentPictureFileName = getCurrentPictureFileName();

        return (
            <>
                <div className="question">
                    {renderPicture(currentPictureFileName)}
                    <div className="answer-wrapper">
                        <div className="recognizability">
                            <span className="text">{getRecognizabilityText()}</span>
                            <Rating
                                currentPictureFileName={currentPictureFileName}
                                onRatingChange={onRecognizabilityChange}
                                ratingName="recognizability"
                                requestInProgress={requestInProgress || isLoadingImage}
                                />
                        </div>
                        <div className="desirability">
                            <span className="text">{getDesirabilityText()}</span>
                            <Rating
                                currentPictureFileName={currentPictureFileName}
                                onRatingChange={onDesirabilityChange}
                                ratingName="desirability"
                                requestInProgress={requestInProgress || isLoadingImage}
                                />
                        </div>
                    </div>
                </div>
                <div className="navigation-buttons card-footer">
                    <span className="question-next">
                        <button
                            className="button is-primary is-outlined"
                            disabled={!state.desirability || !state.recognizability || requestInProgress || isLoadingImage}
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

    function renderAttentionCheck(attentionText, gifSrc) {
        return (
            <>
                <div className="attention-check">
                    <pre className="text">{attentionText}</pre>
                    <img className="attention-image" src={gifSrc} />
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
            {shouldShowAttentionCheckOne && renderAttentionCheck(attentionCheckTextOne, monkeyPleaseGifSrc)}
            {shouldShowAttentionCheckTwo && renderAttentionCheck(attentionCheckTextTwo, lionKingPleaseGifSrc)}
            {!shouldShowAttentionCheckOne && !shouldShowAttentionCheckTwo ? renderQuestion() : null}
        </div>
    );
};

Survey.propTypes = {
    onEndSurvey: PropTypes.func.isRequired,
    onRatePicture: PropTypes.func.isRequired,
    pictureHost: PropTypes.string.isRequired,
    picturesToRate: PropTypes.arrayOf(PropTypes.shape({
        Path: PropTypes.string.isRequired,
        FileName: PropTypes.string.isRequired,
        Category: PropTypes.string.isRequired
    })),
    requestInProgress: PropTypes.bool.isRequired
};

export default Survey;
