/* eslint-disable sort-keys */
import superAgent from 'superagent';

import actions from './actions';

const startEligibilitySurveyErrored = (bool) => {
    return {
        type: actions.NEW_USER_ERRORED,
        hasErrored: bool
    };
};

const startEligibilitySurveySaving = (bool) => {
    return {
        type: actions.NEW_USER_SAVING,
        isSaving: bool
    };
};

const startEligibilitySurveySaved = (id) => {
    return {
        type: actions.NEW_USER_SAVED,
        id
    };
};

export const onStartEligibilitySurvey = () => {
    return (dispatch, getState) => {
        const { userId } = getState();

        dispatch(startEligibilitySurveySaving(true));

        const startEligibilitySurveyBody = { userId };

        return superAgent.post('/api/User/StartEligibilitySurvey')
            .set('Content-Type', 'application/json')
            .send(startEligibilitySurveyBody)
            .then(() => dispatch(startEligibilitySurveySaved(userId)))
            .catch(() => dispatch(startEligibilitySurveyErrored(true)));
    };
};
