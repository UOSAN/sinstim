/* eslint-disable sort-keys */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import _get from 'lodash/get';

import actions from './actions';

export const requestErrored = (bool) => {
    return {
        type: actions.REQUEST_ERRORED,
        requestErrored: bool
    };
};

export const requestInProgress = (bool) => {
    return {
        type: actions.REQUEST_IN_PROGRESS,
        requestInProgress: bool
    };
};

export const onConsentAccept = () => {
    return (dispatch) => {
        dispatch({
            type: actions.CONSENT_ACCEPT
        });
    };
};

export const onConsentDecline = () => {
    return (dispatch) => {
        dispatch({
            type: actions.CONSENT_DECLINE
        });
    };
};

const rejectUserSaved = () => {
    return {
        type: actions.REJECT_USER
    };
};

export const onRejectUser = () => {
    return (dispatch, getState) => {
        const { id } = getState();

        dispatch(requestInProgress(true));

        const client = axios.create();

        axiosRetry(client);

        return client.post(`/api/Survey/Reject?id=${id}`, null, {
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
            .then(() => dispatch(rejectUserSaved()))
            .catch(() => dispatch(requestErrored(true)));
    };
};

