/* eslint-disable sort-keys */
import axios from 'axios';

import actions from './actions';

const getUserErrored = (bool) => {
    return {
        type: actions.GET_USER_ERRORED,
        hasErrored: bool
    };
};

const getUserInProgress = (bool) => {
    return {
        type: actions.GET_USER_IN_PROGRESS,
        isGetting: bool
    };
};

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
        dispatch(getUserInProgress(true));

        return axios.get(`/api/User/${id}`)
            .then((response) => dispatch(getUserComplete(response.data)))
            .catch(() => dispatch(getUserErrored(true)));
    };
};

const startSurveyErrored = (bool) => {
    return {
        type: actions.START_SURVEY_ERRORED,
        hasErrored: bool
    };
};

const startSurveySaving = (bool) => {
    return {
        type: actions.START_SURVEY_SAVING,
        isSaving: bool
    };
};

const startSurveySaved = ({ surveyStartTime }) => {
    return {
        type: actions.START_SURVEY_SAVED,
        surveyStartTime
    };
};

export const onStartSurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(startSurveySaving(true));

        const startSurveyBody = { id };

        return axios.post('/api/Survey/Start', startSurveyBody)
            .then((response) => dispatch(startSurveySaved(response.data)))
            .catch(() => dispatch(startSurveyErrored(true)));
    };
};
