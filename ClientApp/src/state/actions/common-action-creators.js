/* eslint-disable sort-keys */
import actions from './actions';

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

export const setConsentText = (consentText) => {
    return (dispatch) => {
        dispatch({
            type: actions.SET_CONSENT_TEXT,
            consentText
        });
    };
};
