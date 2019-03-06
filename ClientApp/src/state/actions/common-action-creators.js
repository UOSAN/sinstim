/* eslint-disable sort-keys */
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
