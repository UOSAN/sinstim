/* eslint-disable sort-keys */
import superAgent from 'superagent';

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

        return superAgent.post('/api/User/Save')
            .set('Content-Type', 'application/json')
            .send(saveUserBody)
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

        return superAgent.post('/api/Eligibility/Start')
            .set('Content-Type', 'application/json')
            .send(startEligibilitySurveyBody)
            .then((response) => dispatch(startEligibilitySurveySaved(response.body.eligibilityStartTime)))
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

const endEligibilitySurveySaved = (eligibilityEndTime) => {
    return {
        type: actions.END_ELIGIBILITY_SURVEY_SAVED,
        eligibilityEndTime
    };
};

export const onEndEligibilitySurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(endEligibilitySurveySaving(true));

        const endEligibilitySurveyBody = { id };

        return superAgent.post('/api/Eligibility/End')
            .set('Content-Type', 'application/json')
            .send(endEligibilitySurveyBody)
            .then((response) => dispatch(endEligibilitySurveySaved(response.body.eligibilityendTime)))
            .catch(() => dispatch(endEligibilitySurveyErrored(true)));
    };
};

// export const onSubmitEligibilitySurveyAnswer = () => {
//     return (dispatch, getState) => {
//         const { id } = getState();

//         dispatch(eligibilitySurveyAnswerSaving(true));

//         const endEligibilitySurveyBody = { id };

//         return superAgent.post('/api/Eligibility/Answer')
//             .set('Content-Type', 'application/json')
//             .send(endEligibilitySurveyBody)
//             .then((response) => dispatch(eligibilitySurveyAnswerSaved(response.body.eligibilityendTime)))
//             .catch(() => dispatch(eligibilitySurveyAnswerErrored(true)));
//     };
// };
