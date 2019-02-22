/* eslint-disable sort-keys */
import axios from 'axios';

import actions from './actions';

const newUserErrored = (bool) => {
    return {
        type: actions.NEW_USER_ERRORED,
        hasErrored: bool
    };
};

const newUserSaving = (bool) => {
    return {
        type: actions.NEW_USER_SAVING,
        isSaving: bool
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
        dispatch(newUserSaving(true));

        const saveUserBody = { id };

        return axios.post('/api/User/Save', saveUserBody)
            .then(() => dispatch(newUserSaved(id)))
            .catch(() => dispatch(newUserErrored(true)));
    };
};


const startEligibilitySurveyErrored = (bool) => {
    return {
        type: actions.START_ELIGIBILITY_SURVEY_ERRORED,
        hasErrored: bool
    };
};

const startEligibilitySurveySaving = (bool) => {
    return {
        type: actions.START_ELIGIBILITY_SURVEY_SAVING,
        isSaving: bool
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

        dispatch(startEligibilitySurveySaving(true));

        const startEligibilitySurveyBody = { id };

        return axios.post('/api/Eligibility/Start', startEligibilitySurveyBody)
            .then((response) => dispatch(startEligibilitySurveySaved(response.data.eligibilityStartTime)))
            .catch(() => dispatch(startEligibilitySurveyErrored(true)));
    };
};

const endEligibilitySurveyErrored = (bool) => {
    return {
        type: actions.END_ELIGIBILITY_SURVEY_ERRORED,
        hasErrored: bool
    };
};

const endEligibilitySurveySaving = (bool) => {
    return {
        type: actions.END_ELIGIBILITY_SURVEY_SAVING,
        isSaving: bool
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

        dispatch(endEligibilitySurveySaving(true));

        const endEligibilitySurveyBody = {
            id,
            answers
        };

        return axios.post('/api/Eligibility/End', endEligibilitySurveyBody)
            .then((response) => dispatch(endEligibilitySurveySaved(response.data)))
            .catch(() => dispatch(endEligibilitySurveyErrored(true)));
    };
};
