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

        return axios.get(`/api/User/${id}`)
            .then((response) => dispatch(getUserComplete(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};

const startSurveySaved = ({ surveyStartTime, assignedCategory }) => {
    return {
        type: actions.START_SURVEY_SAVED,
        assignedCategory,
        surveyStartTime
    };
};

export const onStartSurvey = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const startSurveyBody = { id };

        return axios.post('/api/Survey/Start', startSurveyBody)
            .then((response) => dispatch(startSurveySaved(response.data)))
            .catch(() => dispatch(requestErrored(true)));
    };
};
