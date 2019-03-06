/* eslint-disable sort-keys */
import axios from 'axios';

import actions from './actions';

const requestErrored = (bool) => {
    return {
        type: actions.REQUEST_ERRORED,
        requestErrored: bool
    };
};

const requestInProgress = (bool) => {
    return {
        type: actions.REQUEST_IN_PROGRESS,
        requestInProgress: bool
    };
};

const newUserSaved = (id) => {
    return {
        type: actions.NEW_USER_SAVED,
        id
    };
};

export const onSaveUser = (id) => {
    return (dispatch) => {
        dispatch(requestInProgress(true));

        const saveUserBody = { id };

        return axios.post('/api/User/Save', saveUserBody)
            .then(() => dispatch(newUserSaved(id)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const startEligibilitySurveySaved = (eligibilityStartTime) => {
    return {
        type: actions.START_ELIGIBILITY_SURVEY_SAVED,
        eligibilityStartTime
    };
};

export const onStartEligibilitySurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const startEligibilitySurveyBody = { id };

        return axios.post('/api/Eligibility/Start', startEligibilitySurveyBody)
            .then((response) => dispatch(startEligibilitySurveySaved(response.data.eligibilityStartTime)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const endEligibilitySurveySaved = ({ eligibilityEndTime, eligibilityCompletionCode }) => {
    return {
        type: actions.END_ELIGIBILITY_SURVEY_SAVED,
        eligibilityEndTime,
        eligibilityCompletionCode
    };
};

export const onEndEligibilitySurvey = (answers) => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const endEligibilitySurveyBody = {
            id,
            answers
        };

        return axios.post('/api/Eligibility/End', endEligibilitySurveyBody)
            .then((response) => dispatch(endEligibilitySurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};
