/* eslint-disable sort-keys */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import _get from 'lodash/get';

import actions from './actions';
import {
    requestErrored,
    requestInProgress
} from './common-action-creators';

const getUserComplete = ({ id, eligibilityStartTime, eligibilityEndTime }) => {
    return {
        type: actions.GET_USER_COMPLETE,
        id,
        eligibilityStartTime,
        eligibilityEndTime
    };
};

export const onGetUser = (id) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        const client = axios.create();

        axiosRetry(client);

        return client.get(`/api/Survey/User/${id}`, {
            'axios-retry': {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 1000;
                },
                retryCondition: (err) => {
                    return _get(err, 'response.data.shouldRetry', false);
                }
            }
        })
            .then((response) => {
                dispatch(getUserComplete(response.data));
                return true;
            })
            .catch(() => {
                dispatch(requestErrored(true));
                return false;
            });
    };
};

const startSurveySaved = ({ surveyStartTime, assignedCategory, picturesToRate, pictureHost }) => {
    return {
        type: actions.START_SURVEY_SAVED,
        assignedCategory,
        surveyStartTime,
        picturesToRate,
        pictureHost
    };
};

export const isLoadingSurvey = (bool) => {
    return {
        type: actions.IS_LOADING_SURVEY,
        isLoadingSurvey: bool
    };
};

export const onStartSurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(isLoadingSurvey(true));
        dispatch(requestInProgress(true));

        const startSurveyBody = { id };

        const client = axios.create();

        axiosRetry(client);

        return client.post('/api/Survey/Start', startSurveyBody, {
            'axios-retry': {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 1000;
                },
                retryCondition: (err) => {
                    return _get(err, 'response.data.shouldRetry', false);
                }
            }
        })
            .then((response) => dispatch(startSurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const ratePictureSaved = () => {
    return {
        type: actions.RATE_PICTURE_SAVED
    };
};

export const onRatePicture = ({ desirability, recognizability, pictureId }) => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const ratePictureBody = {
            desirability,
            id,
            pictureId,
            recognizability
        };

        const client = axios.create();

        axiosRetry(client);

        return client.post('/api/Survey/Rate', ratePictureBody, {
            'axios-retry': {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 1000;
                },
                retryCondition: (err) => {
                    return _get(err, 'response.data.shouldRetry', false);
                }
            }
        })
            .then(() => dispatch(ratePictureSaved()))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const endSurveySaved = ({ surveyEndTime, surveyCompletionCode }) => {
    return {
        type: actions.END_SURVEY_SAVED,
        surveyEndTime,
        surveyCompletionCode
    };
};

export const onEndSurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const endSurveyBody = { id };

        const client = axios.create();

        axiosRetry(client);

        return client.post('/api/Survey/End', endSurveyBody, {
            'axios-retry': {
                retries: 3,
                retryDelay: (retryCount) => {
                    return retryCount * 1000;
                },
                retryCondition: (err) => {
                    return _get(err, 'response.data.shouldRetry', false);
                }
            }
        })
            .then((response) => dispatch(endSurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

