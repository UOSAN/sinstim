/* eslint-disable sort-keys */
import axios from 'axios';

import actions from './actions';

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

const startSurveySaved = (id) => {
    return {
        type: actions.START_SURVEY_SAVED,
        id
    };
};

export const onStartSurvey = (id) => {
    return (dispatch) => {
        dispatch(startSurveySaving(true));

        const startSurveyBody = { id };

        return axios.post('/api/Survey/Start', startSurveyBody)
            .then(() => dispatch(startSurveySaved(id)))
            .catch(() => dispatch(startSurveyErrored(true)));
    };
};
