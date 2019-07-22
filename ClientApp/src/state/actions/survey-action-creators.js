/* eslint-disable sort-keys */
import axios from 'axios';

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

        return axios.get(`/api/Survey/User/${id}`)
            .then((response) => dispatch(getUserComplete(response.data)))
            .catch(() => dispatch(requestErrored(true)));
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

        return axios.post('/api/Survey/Start', startSurveyBody)
            .then((response) => dispatch(startSurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const ratePictureSaved = () => {
    return {
        type: actions.RATE_PICTURE_SAVED
    };
};

export const onRatePicture = ({ fileName, desirability, recognizability }) => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const ratePictureBody = {
            desirability,
            fileName,
            id,
            recognizability
        };

        return axios.post('/api/Survey/Rate', ratePictureBody)
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

        return axios.post('/api/Survey/End', endSurveyBody)
            .then((response) => dispatch(endSurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};
