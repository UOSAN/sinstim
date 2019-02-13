/* eslint-disable sort-keys */
import actions from './actions';

import superAgent from 'superagent';

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

        return superAgent.post('/api/User')
            .set('Content-Type', 'application/json')
            .send(saveUserBody)
            .then(() => dispatch(newUserSaved(id)))
            .catch(() => dispatch(newUserErrored(true)));
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

export const onEligibilityInstructionsAccept = () => {
    return (dispatch) => {
        dispatch({
            type: actions.ELIGIBILITY_INSTRUCTIONS_ACCEPT
        });
    };
};
