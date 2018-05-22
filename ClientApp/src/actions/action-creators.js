import actions from './actions';

import superAgent from 'superagent';

export function newUserErrored(bool) {
    return {
        type: actions.NEW_USER_ERRORED,
        hasErrored: bool
    };
}

export function newUserSaving(bool) {
    return {
        type: actions.NEW_USER_SAVING,
        isSaving: bool
    };
}

export function newUserSaved(id) {
    return {
        type: actions.NEW_USER_SAVED,
        id
    };
}

export const onSaveUser = (id) => {
    return (dispatch) => {
        dispatch(newUserSaving(true));

        const saveUserBody = { id };
        superAgent.post('/api/User')
            .set('Content-Type', 'application/json')
            .send(saveUserBody)
            .then(() => dispatch(newUserSaved(id)))
            .catch(() => dispatch(newUserErrored(true)));

    }
}